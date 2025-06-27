# Role-Based Protection System

This directory contains hooks for implementing role-based access control (RBAC) in the ELearning application.

## Available Hooks

### `useRoleProtection`
A generic hook for protecting routes based on user roles.

```typescript
import { useRoleProtection } from './useRoleProtection';

const { loading, isAuthorized, userData } = useRoleProtection({
  requiredRole: '3', // Role ID required
  redirectTo: '/', // Where to redirect if unauthorized
  onUnauthorized: () => console.log('Unauthorized') // Optional callback
});
```

### `useInstructorProtection`
Convenience hook for protecting instructor-only routes (ROLE_ID: "3").

```typescript
import { useInstructorProtection } from './useRoleProtection';

const { loading, isAuthorized, userData } = useInstructorProtection('/');
```

### `useStudentProtection`
Convenience hook for protecting student-only routes (ROLE_ID: "2").

```typescript
import { useStudentProtection } from './useRoleProtection';

const { loading, isAuthorized, userData } = useStudentProtection('/');
```

### `useAdminProtection` (Legacy)
Legacy hook for backward compatibility (ROLE_ID: "2").

```typescript
import { useAdminProtection } from './useRoleProtection';

const { loading, isAuthorized, userData } = useAdminProtection('/');
```

### `useLearnerProtection` (Legacy)
Legacy hook for backward compatibility (ROLE_ID: "2").

```typescript
import { useLearnerProtection } from './useRoleProtection';

const { loading, isAuthorized, userData } = useLearnerProtection('/');
```

## Role IDs

- **"2"**: Student
- **"3"**: Teacher/Instructor

## Usage Example

```typescript
'use client'
import { useInstructorProtection } from '../../hooks/useRoleProtection';
import LoadingSpinner from '../components/ui/LoadingSpinner';

export default function InstructorPage() {
  const { loading, isAuthorized } = useInstructorProtection();

  if (loading) {
    return <LoadingSpinner message="Checking authorization..." />;
  }

  if (!isAuthorized) {
    return null; // Will redirect automatically
  }

  return (
    <div>
      <h1>Instructor Dashboard</h1>
      {/* Your protected content here */}
    </div>
  );
}
```

## Features

- **Authentication Check**: Automatically checks if user is signed in
- **Role Verification**: Fetches user data and verifies role permissions
- **Automatic Redirects**: Redirects unauthorized users to specified pages
- **Loading States**: Provides loading states during authorization checks
- **Error Handling**: Handles API errors gracefully
- **TypeScript Support**: Fully typed for better development experience

## Integration with Clerk

The hooks integrate with Clerk authentication and automatically:
- Use Clerk tokens for API requests
- Redirect to sign-in if not authenticated
- Handle Clerk user data

## API Endpoint

The hooks expect the user service to be running at `http://localhost:5000/api/users/{userId}` and return user data with a `ROLE_ID` field. 