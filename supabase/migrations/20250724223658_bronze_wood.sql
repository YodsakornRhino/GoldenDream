/*
  # Seed Sample Data for DreamHome

  This migration adds sample data for development and testing:
  - Sample agents
  - Sample properties
  - Sample inquiries
*/

-- Insert sample agents
INSERT INTO agents (id, name, email, phone, bio, specialties, rating, reviews_count, sales_count, experience_years) VALUES
  (
    'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    'Sarah Johnson',
    'sarah@dreamhome.com',
    '(555) 123-4567',
    'Experienced real estate agent specializing in luxury homes and first-time buyers. Committed to providing exceptional service.',
    ARRAY['Luxury Homes', 'First-time Buyers'],
    4.9,
    127,
    89,
    8
  ),
  (
    'b2c3d4e5-f6g7-8901-bcde-f23456789012',
    'Michael Chen',
    'michael@dreamhome.com',
    '(555) 234-5678',
    'Commercial real estate specialist with over 12 years of experience in investment properties.',
    ARRAY['Commercial', 'Investment'],
    4.8,
    94,
    156,
    12
  ),
  (
    'c3d4e5f6-g7h8-9012-cdef-345678901234',
    'Emily Rodriguez',
    'emily@dreamhome.com',
    '(555) 345-6789',
    'Residential expert focusing on family homes and condominiums in the metropolitan area.',
    ARRAY['Family Homes', 'Condos'],
    4.9,
    203,
    134,
    6
  ),
  (
    'd4e5f6g7-h8i9-0123-defg-456789012345',
    'David Thompson',
    'david@dreamhome.com',
    '(555) 456-7890',
    'Luxury property specialist with expertise in waterfront and high-end residential properties.',
    ARRAY['Luxury', 'Waterfront'],
    5.0,
    78,
    67,
    15
  ),
  (
    'e5f6g7h8-i9j0-1234-efgh-567890123456',
    'Lisa Park',
    'lisa@dreamhome.com',
    '(555) 567-8901',
    'New construction expert specializing in modern developments and custom builds.',
    ARRAY['New Builds', 'Developments'],
    4.8,
    112,
    98,
    9
  ),
  (
    'f6g7h8i9-j0k1-2345-fghi-678901234567',
    'Robert Wilson',
    'robert@dreamhome.com',
    '(555) 678-9012',
    'Investment advisor with extensive experience in rental properties and real estate investments.',
    ARRAY['Investments', 'Rentals'],
    4.7,
    156,
    201,
    11
  );

-- Insert sample properties
INSERT INTO properties (id, title, description, price, location, bedrooms, bathrooms, square_feet, property_type, listing_type, status, features, agent_id) VALUES
  (
    '11111111-2222-3333-4444-555555555555',
    'Modern Family Home',
    'Beautiful modern family home in a quiet neighborhood. Features include updated kitchen, hardwood floors, spacious backyard, and two-car garage. Perfect for families looking for comfort and convenience.',
    450000,
    '123 Oak Street, Downtown',
    3,
    2,
    1200,
    'house',
    'sale',
    'active',
    ARRAY['Hardwood Floors', 'Updated Kitchen', 'Two-Car Garage', 'Backyard', 'Central Air', 'Near Schools'],
    'a1b2c3d4-e5f6-7890-abcd-ef1234567890'
  ),
  (
    '22222222-3333-4444-5555-666666666666',
    'Luxury Apartment',
    'Stunning luxury apartment with modern amenities and city views. Features high-end finishes, in-unit laundry, and access to building amenities.',
    2500,
    '456 Pine Avenue, Midtown',
    2,
    2,
    950,
    'apartment',
    'rent',
    'active',
    ARRAY['City Views', 'In-unit Laundry', 'Gym Access', 'Concierge', 'Pet Friendly', 'Parking'],
    'c3d4e5f6-g7h8-9012-cdef-345678901234'
  ),
  (
    '33333333-4444-5555-6666-777777777777',
    'Cozy Cottage',
    'Charming cottage with vintage character and modern updates. Perfect starter home with a lovely garden and quiet street location.',
    320000,
    '789 Maple Drive, Suburbs',
    2,
    1,
    800,
    'house',
    'sale',
    'active',
    ARRAY['Vintage Character', 'Garden', 'Quiet Street', 'Updated Plumbing', 'New Roof'],
    'a1b2c3d4-e5f6-7890-abcd-ef1234567890'
  ),
  (
    '44444444-5555-6666-7777-888888888888',
    'Downtown Loft',
    'Industrial-style loft in the heart of downtown. High ceilings, exposed brick, and modern amenities. Walking distance to restaurants and entertainment.',
    380000,
    '321 Broadway, City Center',
    1,
    1,
    750,
    'condo',
    'sale',
    'active',
    ARRAY['High Ceilings', 'Exposed Brick', 'Downtown Location', 'Modern Kitchen', 'Walk Score 95'],
    'b2c3d4e5-f6g7-8901-bcde-f23456789012'
  ),
  (
    '55555555-6666-7777-8888-999999999999',
    'Garden Villa',
    'Spacious villa with beautiful gardens and premium finishes. Perfect for entertaining with large living spaces and outdoor areas.',
    3200,
    '654 Garden Lane, Westside',
    4,
    3,
    1800,
    'house',
    'rent',
    'active',
    ARRAY['Beautiful Gardens', 'Premium Finishes', 'Large Living Spaces', 'Outdoor Areas', 'Garage', 'Security System'],
    'd4e5f6g7-h8i9-0123-defg-456789012345'
  ),
  (
    '66666666-7777-8888-9999-aaaaaaaaaaaa',
    'Waterfront Condo',
    'Stunning waterfront condominium with panoramic views. Luxury building with resort-style amenities and private beach access.',
    750000,
    '987 Waterfront Drive, Marina District',
    3,
    2,
    1400,
    'condo',
    'sale',
    'active',
    ARRAY['Waterfront Views', 'Private Beach', 'Resort Amenities', 'Concierge', 'Valet Parking', 'Wine Storage'],
    'd4e5f6g7-h8i9-0123-defg-456789012345'
  );

-- Insert sample inquiries
INSERT INTO inquiries (property_id, agent_id, name, email, phone, message, inquiry_type, status) VALUES
  (
    '11111111-2222-3333-4444-555555555555',
    'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    'John Smith',
    'john.smith@email.com',
    '(555) 111-2222',
    'I am interested in scheduling a viewing for this property. When would be a good time?',
    'viewing',
    'new'
  ),
  (
    '22222222-3333-4444-5555-666666666666',
    'c3d4e5f6-g7h8-9012-cdef-345678901234',
    'Maria Garcia',
    'maria.garcia@email.com',
    '(555) 333-4444',
    'Could you provide more information about the building amenities and lease terms?',
    'information',
    'contacted'
  ),
  (
    '55555555-6666-7777-8888-999999999999',
    'd4e5f6g7-h8i9-0123-defg-456789012345',
    'James Wilson',
    'james.wilson@email.com',
    '(555) 555-6666',
    'I would like to make an offer on this property. Please contact me to discuss terms.',
    'offer',
    'new'
  );