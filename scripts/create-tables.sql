-- Enable Row Level Security
ALTER DATABASE postgres SET "app.jwt_secret" TO 'your-jwt-secret';

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  username TEXT UNIQUE NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  phone TEXT,
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
  images TEXT[] DEFAULT '{}',
  amenities TEXT[] DEFAULT '{}',
  agent_id UUID REFERENCES profiles(id),
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'pending', 'sold', 'rented')),
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
  message TEXT NOT NULL,
  contact_email TEXT NOT NULL,
  contact_phone TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'responded', 'closed')),
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
  FOR SELECT USING (true);

CREATE POLICY "Authenticated users can insert properties" ON properties
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Users can update their own properties" ON properties
  FOR UPDATE USING (auth.uid() = agent_id);

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

CREATE POLICY "Property agents can view inquiries for their properties" ON inquiries
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM properties 
      WHERE properties.id = inquiries.property_id 
      AND properties.agent_id = auth.uid()
    )
  );

CREATE POLICY "Users can insert inquiries" ON inquiries
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Create function to handle new user registration
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, username, full_name)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'username', split_part(NEW.email, '@', 1)),
    COALESCE(NEW.raw_user_meta_data->>'full_name', '')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user registration
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_properties_updated_at BEFORE UPDATE ON properties
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_inquiries_updated_at BEFORE UPDATE ON inquiries
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Insert sample data
INSERT INTO properties (title, description, price, property_type, listing_type, bedrooms, bathrooms, square_feet, address, city, state, zip_code, images, amenities) VALUES
('Modern Downtown Apartment', 'Beautiful 2-bedroom apartment in the heart of downtown with city views', 450000, 'apartment', 'sale', 2, 2, 1200, '123 Main St', 'New York', 'NY', '10001', ARRAY['/placeholder.svg?height=400&width=600&text=Modern+Apartment'], ARRAY['gym', 'pool', 'parking', 'doorman']),
('Cozy Family Home', 'Charming 3-bedroom house with a large backyard, perfect for families', 650000, 'house', 'sale', 3, 2, 1800, '456 Oak Ave', 'Los Angeles', 'CA', '90210', ARRAY['/placeholder.svg?height=400&width=600&text=Family+Home'], ARRAY['garage', 'garden', 'fireplace']),
('Luxury Condo with Ocean View', 'Stunning oceanfront condo with panoramic views and premium amenities', 1200000, 'condo', 'sale', 2, 3, 1500, '789 Beach Blvd', 'Miami', 'FL', '33139', ARRAY['/placeholder.svg?height=400&width=600&text=Ocean+Condo'], ARRAY['ocean_view', 'balcony', 'concierge', 'spa']),
('Spacious Townhouse', 'Modern 4-bedroom townhouse in a quiet neighborhood with great schools', 2500, 'townhouse', 'rent', 4, 3, 2200, '321 Elm St', 'Austin', 'TX', '78701', ARRAY['/placeholder.svg?height=400&width=600&text=Townhouse'], ARRAY['garage', 'patio', 'storage']),
('Studio Apartment Downtown', 'Efficient studio apartment perfect for young professionals', 1800, 'apartment', 'rent', 0, 1, 500, '654 Pine St', 'Seattle', 'WA', '98101', ARRAY['/placeholder.svg?height=400&width=600&text=Studio'], ARRAY['gym', 'rooftop', 'laundry']),
('Victorian House', 'Historic Victorian home with original details and modern updates', 850000, 'house', 'sale', 4, 3, 2500, '987 Heritage Ln', 'San Francisco', 'CA', '94102', ARRAY['/placeholder.svg?height=400&width=600&text=Victorian+House'], ARRAY['historic', 'garden', 'fireplace', 'hardwood']);
