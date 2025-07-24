-- Enable Row Level Security
ALTER DATABASE postgres SET "app.jwt_secret" TO 'your-jwt-secret';

-- Create profiles table
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  username TEXT UNIQUE,
  full_name TEXT,
  avatar_url TEXT,
  phone TEXT,
  bio TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create properties table
CREATE TABLE IF NOT EXISTS public.properties (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  price DECIMAL(12,2) NOT NULL,
  property_type TEXT NOT NULL CHECK (property_type IN ('house', 'apartment', 'condo', 'townhouse', 'villa')),
  listing_type TEXT NOT NULL CHECK (listing_type IN ('sale', 'rent')),
  bedrooms INTEGER,
  bathrooms DECIMAL(3,1),
  square_feet INTEGER,
  lot_size DECIMAL(10,2),
  year_built INTEGER,
  address TEXT NOT NULL,
  city TEXT NOT NULL,
  state TEXT NOT NULL,
  zip_code TEXT NOT NULL,
  country TEXT DEFAULT 'US',
  latitude DECIMAL(10,8),
  longitude DECIMAL(11,8),
  images TEXT[] DEFAULT '{}',
  amenities TEXT[] DEFAULT '{}',
  features TEXT[] DEFAULT '{}',
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'pending', 'sold', 'rented', 'inactive')),
  agent_id UUID REFERENCES public.profiles(id),
  owner_id UUID REFERENCES public.profiles(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create favorites table
CREATE TABLE IF NOT EXISTS public.favorites (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  property_id UUID REFERENCES public.properties(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, property_id)
);

-- Create inquiries table
CREATE TABLE IF NOT EXISTS public.inquiries (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  property_id UUID REFERENCES public.properties(id) ON DELETE CASCADE,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  agent_id UUID REFERENCES public.profiles(id),
  message TEXT NOT NULL,
  contact_email TEXT NOT NULL,
  contact_phone TEXT,
  preferred_contact TEXT DEFAULT 'email' CHECK (preferred_contact IN ('email', 'phone', 'both')),
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'responded', 'closed')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.favorites ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Public profiles are viewable by everyone" ON public.profiles
  FOR SELECT USING (true);

CREATE POLICY "Users can insert their own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

-- Properties policies
CREATE POLICY "Properties are viewable by everyone" ON public.properties
  FOR SELECT USING (true);

CREATE POLICY "Authenticated users can insert properties" ON public.properties
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Users can update their own properties" ON public.properties
  FOR UPDATE USING (auth.uid() = owner_id OR auth.uid() = agent_id);

CREATE POLICY "Users can delete their own properties" ON public.properties
  FOR DELETE USING (auth.uid() = owner_id OR auth.uid() = agent_id);

-- Favorites policies
CREATE POLICY "Users can view their own favorites" ON public.favorites
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own favorites" ON public.favorites
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own favorites" ON public.favorites
  FOR DELETE USING (auth.uid() = user_id);

-- Inquiries policies
CREATE POLICY "Users can view inquiries they created" ON public.inquiries
  FOR SELECT USING (auth.uid() = user_id OR auth.uid() = agent_id);

CREATE POLICY "Authenticated users can create inquiries" ON public.inquiries
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Users can update inquiries they created" ON public.inquiries
  FOR UPDATE USING (auth.uid() = user_id OR auth.uid() = agent_id);

-- Create function to automatically create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, username, full_name)
  VALUES (
    NEW.id,
    NEW.raw_user_meta_data->>'username',
    NEW.raw_user_meta_data->>'full_name'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger to call the function on user creation
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
CREATE TRIGGER handle_updated_at BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER handle_updated_at BEFORE UPDATE ON public.properties
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER handle_updated_at BEFORE UPDATE ON public.inquiries
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- Insert sample data
INSERT INTO public.properties (
  title, description, price, property_type, listing_type, bedrooms, bathrooms, 
  square_feet, address, city, state, zip_code, images, amenities, features
) VALUES 
(
  'Modern Downtown Apartment',
  'Beautiful modern apartment in the heart of downtown with stunning city views.',
  2500.00,
  'apartment',
  'rent',
  2,
  2.0,
  1200,
  '123 Main Street, Unit 4B',
  'New York',
  'NY',
  '10001',
  ARRAY['/placeholder.jpg?height=400&width=600&query=modern apartment'],
  ARRAY['gym', 'pool', 'parking', 'doorman'],
  ARRAY['hardwood floors', 'stainless steel appliances', 'in-unit laundry']
),
(
  'Luxury Family Home',
  'Spacious family home with large backyard and modern amenities.',
  850000.00,
  'house',
  'sale',
  4,
  3.5,
  2800,
  '456 Oak Avenue',
  'Los Angeles',
  'CA',
  '90210',
  ARRAY['/placeholder.jpg?height=400&width=600&query=luxury house'],
  ARRAY['garage', 'garden', 'pool'],
  ARRAY['granite countertops', 'walk-in closets', 'fireplace']
),
(
  'Cozy Studio Loft',
  'Charming studio loft in trendy neighborhood, perfect for young professionals.',
  1800.00,
  'apartment',
  'rent',
  1,
  1.0,
  650,
  '789 Industrial Blvd, Loft 12',
  'San Francisco',
  'CA',
  '94102',
  ARRAY['/placeholder.jpg?height=400&width=600&query=studio loft'],
  ARRAY['exposed brick', 'high ceilings', 'bike storage'],
  ARRAY['exposed beams', 'concrete floors', 'large windows']
);
