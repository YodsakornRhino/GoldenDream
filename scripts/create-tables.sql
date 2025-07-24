-- Enable Row Level Security
ALTER DATABASE postgres SET "app.jwt_secret" TO 'your-jwt-secret';

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  username TEXT UNIQUE,
  full_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create properties table
CREATE TABLE IF NOT EXISTS properties (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  price DECIMAL(12,2) NOT NULL,
  property_type TEXT NOT NULL CHECK (property_type IN ('house', 'apartment', 'condo', 'townhouse', 'land')),
  listing_type TEXT NOT NULL CHECK (listing_type IN ('sale', 'rent')),
  bedrooms INTEGER,
  bathrooms INTEGER,
  square_feet INTEGER,
  address TEXT NOT NULL,
  city TEXT NOT NULL,
  state TEXT NOT NULL,
  zip_code TEXT NOT NULL,
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  images TEXT[],
  amenities TEXT[],
  agent_id UUID REFERENCES profiles(id),
  is_featured BOOLEAN DEFAULT FALSE,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create favorites table
CREATE TABLE IF NOT EXISTS favorites (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  property_id UUID REFERENCES properties(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, property_id)
);

-- Create inquiries table
CREATE TABLE IF NOT EXISTS inquiries (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  property_id UUID REFERENCES properties(id) ON DELETE CASCADE,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  message TEXT NOT NULL,
  inquiry_type TEXT DEFAULT 'general' CHECK (inquiry_type IN ('general', 'viewing', 'offer', 'information')),
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'closed')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE favorites ENABLE ROW LEVEL SECURITY;
ALTER TABLE inquiries ENABLE ROW LEVEL SECURITY;

-- Create policies for profiles
CREATE POLICY "Public profiles are viewable by everyone" ON profiles
  FOR SELECT USING (true);

CREATE POLICY "Users can insert their own profile" ON profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

-- Create policies for properties
CREATE POLICY "Properties are viewable by everyone" ON properties
  FOR SELECT USING (is_active = true);

CREATE POLICY "Authenticated users can insert properties" ON properties
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Users can update their own properties" ON properties
  FOR UPDATE USING (agent_id = auth.uid());

-- Create policies for favorites
CREATE POLICY "Users can view their own favorites" ON favorites
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own favorites" ON favorites
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own favorites" ON favorites
  FOR DELETE USING (auth.uid() = user_id);

-- Create policies for inquiries
CREATE POLICY "Users can view their own inquiries" ON inquiries
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert inquiries" ON inquiries
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Property agents can view inquiries for their properties" ON inquiries
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM properties 
      WHERE properties.id = inquiries.property_id 
      AND properties.agent_id = auth.uid()
    )
  );

-- Create function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, username, full_name, avatar_url)
  VALUES (
    NEW.id,
    NEW.raw_user_meta_data->>'username',
    NEW.raw_user_meta_data->>'full_name',
    NEW.raw_user_meta_data->>'avatar_url'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user signup
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
CREATE TRIGGER handle_updated_at BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER handle_updated_at BEFORE UPDATE ON properties
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER handle_updated_at BEFORE UPDATE ON inquiries
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- Insert sample properties
INSERT INTO properties (
  title, description, price, property_type, listing_type, bedrooms, bathrooms, 
  square_feet, address, city, state, zip_code, is_featured, amenities
) VALUES 
(
  'Modern Downtown Apartment',
  'Beautiful modern apartment in the heart of downtown with stunning city views.',
  2500.00, 'apartment', 'rent', 2, 2, 1200,
  '123 Main St', 'New York', 'NY', '10001', true,
  ARRAY['gym', 'pool', 'parking', 'balcony']
),
(
  'Luxury Family Home',
  'Spacious family home with large backyard and modern amenities.',
  750000.00, 'house', 'sale', 4, 3, 2800,
  '456 Oak Ave', 'Los Angeles', 'CA', '90210', true,
  ARRAY['garage', 'garden', 'fireplace', 'pool']
),
(
  'Cozy Studio Apartment',
  'Perfect starter home in a quiet neighborhood with easy access to public transport.',
  1800.00, 'apartment', 'rent', 1, 1, 600,
  '789 Pine St', 'San Francisco', 'CA', '94102', false,
  ARRAY['laundry', 'parking']
);
