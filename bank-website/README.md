# Bank Website - Customer Registration System

A modern banking website built with Next.js that includes a comprehensive customer registration system with face scanning capabilities.

## Features

### 🏦 Customer Registration
- Multi-step registration process
- Form validation and error handling
- Progress indicator showing current step
- Responsive design for all devices

### 📸 Face Scanning Technology
- Real-time camera access for face capture
- Face quality validation
- Integration with backend face processing API
- Secure image handling

### 🎨 Modern UI/UX
- Clean, professional banking interface
- Blue color scheme matching banking standards
- Responsive design for mobile and desktop
- Smooth animations and transitions

## Pages

1. **Home Page** (`/`) - Landing page with registration and login options
2. **Registration Page** (`/registration`) - Customer registration form
3. **Face Scan Page** (`/face-scan`) - Face capture and processing

## API Endpoints

- `POST /api/register` - Handle customer registration
- `POST /api/face-scan` - Process face images

## Technology Stack

- **Framework**: Next.js 15.4.5
- **Language**: TypeScript
- **Styling**: Plain CSS (no TailwindCSS)
- **Frontend**: React 19.1.0
- **Backend**: Next.js API Routes

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd bank-website
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/
│   ├── api/
│   │   ├── register/
│   │   │   └── route.ts          # Registration API
│   │   └── face-scan/
│   │       └── route.ts          # Face scanning API
│   ├── registration/
│   │   ├── page.tsx              # Registration page
│   │   └── registration.css      # Registration styles
│   ├── face-scan/
│   │   ├── page.tsx              # Face scanning page
│   │   └── face-scan.css         # Face scanning styles
│   ├── globals.css               # Global styles
│   ├── layout.tsx                # Root layout
│   ├── page.tsx                  # Home page
│   └── page.module.css           # Home page styles
```

## Features in Detail

### Registration Form
- Full name, NRIC, phone number, email, and address fields
- FacePay toggle for enabling face recognition payments
- Face capture integration
- Form validation with error messages

### Face Scanning
- Camera access using `getUserMedia` API
- Real-time video preview
- Image capture and processing
- Quality validation before submission
- Error handling for camera permissions

### API Integration
- RESTful API endpoints
- JSON request/response handling
- Error handling and validation
- Simulated backend processing

## Security Considerations

- Form validation on both client and server side
- Secure image handling (base64 encoding)
- Input sanitization
- Error handling without exposing sensitive information

## Browser Compatibility

- Modern browsers with camera API support
- HTTPS required for camera access
- Mobile-responsive design

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Environment Variables

No environment variables are currently required for basic functionality.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is for educational purposes. Please ensure compliance with local banking regulations when implementing in production.

## Support

For questions or issues, please create an issue in the repository.
