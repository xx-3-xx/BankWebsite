import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate required fields
    const { accountNumber, bankName } = body;
    
    if (!accountNumber || !bankName) {
      return NextResponse.json(
        { error: 'Account number and bank name are required' },
        { status: 400 }
      );
    }

    // Validate account number format (basic validation)
    if (!/^\d{8,16}$/.test(accountNumber)) {
      return NextResponse.json(
        { error: 'Invalid account number format' },
        { status: 400 }
      );
    }

    // Here you would typically:
    // 1. Validate the account exists in the specified bank
    // 2. Send SMS verification code to the registered mobile number
    // 3. Store the verification code temporarily with expiration
    // 4. Log the verification attempt
    
    console.log('Verification code request:', {
      accountNumber,
      bankName,
      timestamp: new Date().toISOString()
    });

    // Simulate SMS sending delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Generate a mock verification code (in real app, this would be sent via SMS)
    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
    
    console.log('Generated verification code:', verificationCode);

    return NextResponse.json({
      success: true,
      message: 'Verification code sent successfully',
      // In a real application, you would NOT return the code in the response
      // This is just for demonstration purposes
      debugCode: verificationCode
    });

  } catch (error) {
    console.error('Send verification error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 