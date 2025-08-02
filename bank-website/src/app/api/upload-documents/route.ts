import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    
    // Get uploaded files
    const icFront = formData.get('icFront') as File;
    const icBack = formData.get('icBack') as File;
    const selfie = formData.get('selfie') as File;
    
    // Validate required files
    if (!icFront || !icBack) {
      return NextResponse.json(
        { error: 'IC front and back images are required' },
        { status: 400 }
      );
    }

    // Validate file types
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    
    if (!allowedTypes.includes(icFront.type)) {
      return NextResponse.json(
        { error: 'IC front image must be a valid image file (JPEG, PNG, WebP)' },
        { status: 400 }
      );
    }
    
    if (!allowedTypes.includes(icBack.type)) {
      return NextResponse.json(
        { error: 'IC back image must be a valid image file (JPEG, PNG, WebP)' },
        { status: 400 }
      );
    }
    
    if (selfie && !allowedTypes.includes(selfie.type)) {
      return NextResponse.json(
        { error: 'Selfie image must be a valid image file (JPEG, PNG, WebP)' },
        { status: 400 }
      );
    }

    // Validate file sizes (max 5MB each)
    const maxSize = 5 * 1024 * 1024; // 5MB
    
    if (icFront.size > maxSize) {
      return NextResponse.json(
        { error: 'IC front image is too large. Maximum size is 5MB.' },
        { status: 400 }
      );
    }
    
    if (icBack.size > maxSize) {
      return NextResponse.json(
        { error: 'IC back image is too large. Maximum size is 5MB.' },
        { status: 400 }
      );
    }
    
    if (selfie && selfie.size > maxSize) {
      return NextResponse.json(
        { error: 'Selfie image is too large. Maximum size is 5MB.' },
        { status: 400 }
      );
    }

    // Here you would typically:
    // 1. Save the files to a secure storage (AWS S3, Azure Blob, etc.)
    // 2. Process and validate the images
    // 3. Store file references in database
    // 4. Log the upload activity
    
    console.log('Document upload received:', {
      icFront: {
        name: icFront.name,
        size: icFront.size,
        type: icFront.type
      },
      icBack: {
        name: icBack.name,
        size: icBack.size,
        type: icBack.type
      },
      selfie: selfie ? {
        name: selfie.name,
        size: selfie.size,
        type: selfie.type
      } : null,
      timestamp: new Date().toISOString()
    });

    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 2000));

    return NextResponse.json({
      success: true,
      message: 'Documents uploaded successfully',
      uploadId: `UPLOAD-${Date.now()}`,
      files: {
        icFront: icFront.name,
        icBack: icBack.name,
        selfie: selfie ? selfie.name : null
      }
    });

  } catch (error) {
    console.error('Document upload error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 