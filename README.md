# Image Processing Microservice on AWS

## Project Overview
This project is a Node.js application that runs a simple image processing microservice deployed on AWS Elastic Beanstalk. The application processes image URLs through a REST API endpoint, applying filters (resize, grayscale, quality adjustment) and returning the processed image.

## Live Demo
The application is deployed and accessible at:
- [Base URL](http://image-filter.eba-7pbts7vi.eu-west-2.elasticbeanstalk.com/)
- [Test Endpoint](http://image-filter.eba-7pbts7vi.eu-west-2.elasticbeanstalk.com/test)
- [Image Processing Endpoint](http://image-filter.eba-7pbts7vi.eu-west-2.elasticbeanstalk.com/filteredimage?image_url=https://picsum.photos/200/300)

## Implementation Features

### REST API Endpoints
- `GET /filteredimage?image_url={{URL}}`: Processes an image from a public URL:
  1. Validates the image URL
  2. Downloads and filters the image
  3. Returns the processed image
  4. Cleans up temporary files

### Error Handling
- 400 Bad Request: When URL is missing or invalid
- 422 Unprocessable Entity: When image processing fails
- 500 Internal Server Error: For server-side errors

### Security Measures
- Input validation for URL parameters
- Content-type verification
- HTTP/HTTPS protocol validation

## AWS Deployment

### AWS Elastic Beanstalk Configuration
- Environment: Node.js 20
- Region: eu-west-2 (London)
- Instance Type: t2.micro
- Custom configurations for NGINX and file permissions

### Deployment Process
1. Created application configuration with `.ebextensions`:
   - Custom NGINX proxy configuration
   - File permissions for the `/tmp` directory
   - Error handling and logging

2. Deployment pipeline:
   - Local development and testing
   - EB CLI for deployment
   - Environment variables configuration
   - Log monitoring and debugging

### Troubleshooting Techniques
- SSH access for direct server inspection
- Log analysis and monitoring
- Network configuration verification
- Error tracking and resolution

## Local Development

### Prerequisites
- Node.js v14+
- NPM or Yarn package manager

### Installation
1. Clone the repository
```bash
git clone <repository-url>
```

2. Install dependencies
```bash
npm install
```

3. Run the development server
```bash
npm start
```

The server will be available at http://localhost:8081

### API Usage Example
```
GET /filteredimage?image_url=https://picsum.photos/200/300
```

## Technologies Used
- Node.js/Express for the backend
- Jimp for image processing
- AWS Elastic Beanstalk for deployment
- NGINX as the web server
- Environment configuration with .ebextensions

## License
[License](LICENSE.txt)