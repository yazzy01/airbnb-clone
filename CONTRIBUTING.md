# Contributing to Enterprise Airbnb Clone

Thank you for your interest in contributing to our enterprise-grade Airbnb clone! This document provides guidelines and information for contributors.

## 🚀 Quick Start

### Prerequisites
- Node.js >= 18.0.0
- npm >= 9.0.0
- PostgreSQL >= 14.0
- Git

### Development Setup
```bash
# Fork and clone the repository
git clone https://github.com/YOUR_USERNAME/airbnb-clone.git
cd airbnb-clone

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Fill in your configuration values

# Set up database
npx prisma generate
npx prisma db push
npx prisma db seed

# Start development server
npm run dev
```

## 🛠️ Development Guidelines

### Code Style
- **TypeScript**: All new code must be written in TypeScript
- **ESLint**: Follow the existing ESLint configuration
- **Prettier**: Use Prettier for code formatting
- **Naming**: Use descriptive names for variables, functions, and components

### Component Guidelines
```typescript
// ✅ Good: Descriptive component with proper TypeScript
interface PropertyCardProps {
  property: Property;
  onBook: (propertyId: string) => void;
  isLoading?: boolean;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({
  property,
  onBook,
  isLoading = false
}) => {
  // Component implementation
};

// ❌ Bad: No TypeScript, unclear naming
const Card = ({ data, onClick }) => {
  // Implementation
};
```

### API Route Guidelines
```typescript
// ✅ Good: Proper error handling and TypeScript
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const createPropertySchema = z.object({
  title: z.string().min(1).max(100),
  description: z.string().min(10).max(1000),
  price: z.number().positive(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = createPropertySchema.parse(body);
    
    // Implementation
    
    return NextResponse.json({ success: true, data: result });
  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid request data' },
      { status: 400 }
    );
  }
}
```

### Database Guidelines
- Use Prisma for all database operations
- Always use transactions for multi-table operations
- Include proper indexes for performance
- Write migrations for schema changes

```typescript
// ✅ Good: Transaction usage
const result = await prisma.$transaction(async (tx) => {
  const booking = await tx.booking.create({ data: bookingData });
  await tx.property.update({
    where: { id: propertyId },
    data: { bookingCount: { increment: 1 } }
  });
  return booking;
});

// ❌ Bad: No transaction for related operations
const booking = await prisma.booking.create({ data: bookingData });
await prisma.property.update({
  where: { id: propertyId },
  data: { bookingCount: { increment: 1 } }
});
```

## 📝 Commit Guidelines

### Commit Message Format
Use the conventional commits format:

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

### Types
- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation only changes
- `style`: Changes that do not affect the meaning of the code
- `refactor`: A code change that neither fixes a bug nor adds a feature
- `perf`: A code change that improves performance
- `test`: Adding missing tests or correcting existing tests
- `chore`: Changes to the build process or auxiliary tools

### Examples
```bash
feat(auth): add Google OAuth integration

fix(booking): resolve date validation error

docs(readme): update installation instructions

refactor(components): extract reusable Button component
```

## 🧪 Testing

### Test Requirements
- Write tests for all new features
- Maintain test coverage above 80%
- Include both unit and integration tests
- Test error scenarios

### Running Tests
```bash
# Run all tests
npm run test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage

# Run specific test file
npm run test -- PropertyCard.test.tsx
```

### Test Examples
```typescript
// Component test
import { render, screen, fireEvent } from '@testing-library/react';
import { PropertyCard } from './PropertyCard';

describe('PropertyCard', () => {
  const mockProperty = {
    id: '1',
    title: 'Test Property',
    price: 100,
    // ... other properties
  };

  it('should render property information correctly', () => {
    render(<PropertyCard property={mockProperty} onBook={jest.fn()} />);
    
    expect(screen.getByText('Test Property')).toBeInTheDocument();
    expect(screen.getByText('$100')).toBeInTheDocument();
  });

  it('should call onBook when book button is clicked', () => {
    const mockOnBook = jest.fn();
    render(<PropertyCard property={mockProperty} onBook={mockOnBook} />);
    
    fireEvent.click(screen.getByText('Book Now'));
    expect(mockOnBook).toHaveBeenCalledWith('1');
  });
});

// API test
import { POST } from '../app/api/properties/route';
import { NextRequest } from 'next/server';

describe('/api/properties', () => {
  it('should create a new property', async () => {
    const request = new NextRequest('http://localhost:3000/api/properties', {
      method: 'POST',
      body: JSON.stringify({
        title: 'Test Property',
        description: 'A test property',
        price: 100,
      }),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.success).toBe(true);
  });
});
```

## 🎨 UI/UX Guidelines

### Design Principles
- **Mobile First**: Design for mobile, enhance for desktop
- **Accessibility**: Follow WCAG 2.1 AA guidelines
- **Consistency**: Use the established design system
- **Performance**: Optimize for fast loading and smooth interactions

### Component Structure
```typescript
// components/ui/Button.tsx
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  children,
  onClick,
}) => {
  return (
    <button
      className={cn(
        'rounded-md font-medium transition-colors',
        variants[variant],
        sizes[size],
        { 'opacity-50 cursor-not-allowed': disabled || loading }
      )}
      disabled={disabled || loading}
      onClick={onClick}
    >
      {loading ? <Spinner /> : children}
    </button>
  );
};
```

### Accessibility Checklist
- [ ] Proper semantic HTML
- [ ] ARIA labels where needed
- [ ] Keyboard navigation support
- [ ] Color contrast compliance
- [ ] Screen reader compatibility
- [ ] Focus indicators

## 🔒 Security Guidelines

### Authentication
- Never store passwords in plain text
- Use NextAuth.js for authentication flows
- Implement proper session management
- Validate user permissions on server-side

### API Security
- Validate all input data
- Use rate limiting for API endpoints
- Implement proper CORS settings
- Sanitize user-generated content

### Data Protection
- Follow GDPR compliance requirements
- Encrypt sensitive data
- Use HTTPS in production
- Implement proper error handling (don't leak sensitive info)

## 📊 Performance Guidelines

### Frontend Performance
- Use Next.js Image component for optimized images
- Implement code splitting for large components
- Minimize bundle size
- Use proper caching strategies

### Backend Performance
- Optimize database queries
- Use connection pooling
- Implement caching where appropriate
- Monitor API response times

### Performance Checklist
- [ ] Lighthouse score > 90
- [ ] First Contentful Paint < 1.5s
- [ ] Time to Interactive < 3s
- [ ] Cumulative Layout Shift < 0.1

## 🚀 Pull Request Process

### Before Submitting
1. **Test your changes**: Run the full test suite
2. **Check code quality**: Run linting and formatting
3. **Update documentation**: Update relevant docs
4. **Test manually**: Verify your changes work as expected

### Pull Request Template
```markdown
## Description
Brief description of the changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Unit tests pass
- [ ] Integration tests pass
- [ ] Manual testing completed

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Documentation updated
- [ ] No breaking changes (or documented)
```

### Review Process
1. **Automated checks**: All CI checks must pass
2. **Code review**: At least one maintainer review required
3. **Testing**: Manual testing by reviewer if needed
4. **Merge**: Squash and merge after approval

## 🐛 Bug Reports

### Bug Report Template
```markdown
## Bug Description
A clear description of the bug

## Steps to Reproduce
1. Go to '...'
2. Click on '....'
3. See error

## Expected Behavior
What you expected to happen

## Actual Behavior
What actually happened

## Environment
- OS: [e.g., macOS, Windows]
- Browser: [e.g., Chrome, Safari]
- Version: [e.g., 1.0.0]

## Additional Context
Any other relevant information
```

## 💡 Feature Requests

### Feature Request Template
```markdown
## Feature Description
A clear description of the feature

## Problem Statement
What problem does this solve?

## Proposed Solution
How should this feature work?

## Alternatives Considered
Other solutions you've considered

## Additional Context
Any other relevant information
```

## 📚 Resources

### Documentation
- [Next.js Documentation](https://nextjs.org/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Prisma Documentation](https://www.prisma.io/docs/)
- [TailwindCSS Documentation](https://tailwindcss.com/docs)

### Tools
- [React Developer Tools](https://react.dev/learn/react-developer-tools)
- [Prisma Studio](https://www.prisma.io/studio)
- [Vercel CLI](https://vercel.com/cli)

## 🤝 Community

### Communication Channels
- **GitHub Issues**: Bug reports and feature requests
- **GitHub Discussions**: General questions and discussions
- **Email**: rziguiyassir@gmail.com for direct contact

### Code of Conduct
- Be respectful and inclusive
- Provide constructive feedback
- Help others learn and grow
- Follow the project's guidelines

## 📄 License

By contributing to this project, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing to the Enterprise Airbnb Clone! 🚀
