import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Debug: Log the received body
    console.log('Received registration request body:', body);
    
    // Validate required fields
    const { fullName, nric, phoneNumber, email, address, enableFacePay } = body;
    
    // Debug: Log individual fields
    console.log('Extracted fields:', {
      fullName: !!fullName,
      nric: !!nric,
      phoneNumber: !!phoneNumber,
      email: !!email,
      address: !!address,
      enableFacePay
    });
    
    if (!fullName || !nric || !phoneNumber || !email || !address) {
      console.log('Validation failed - missing fields');
      return NextResponse.json(
        { error: 'All required fields must be filled' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      console.log('Validation failed - invalid email format:', email);
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Here you would typically:
    // 1. Save the data to a database
    // 2. Send confirmation emails
    // 3. Create user accounts
    // 4. Log the registration
    
    console.log('Registration data received:', {
      fullName,
      nric,
      phoneNumber,
      email,
      address,
      enableFacePay,
      timestamp: new Date().toISOString()
    });

    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 1000));

    return NextResponse.json({
      success: true,
      message: 'Registration successful',
      customerId: `CUST-${Date.now()}`,
      nextStep: 'upload-documents'
    });

  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 