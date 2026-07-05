// FILE: src/App.tsx
// WHY: this is your form, now also reads theme from ThemeContext to change colors
// CONNECTION: imports useTheme from ThemeContext.tsx, which is provided in main.tsx

import { useForm } from '@tanstack/react-form';
import { useTheme } from './ThemeContext';
import './App.css';

function App() {
  // reads current theme and toggle function from context, no props needed
  const { theme, toggleTheme } = useTheme();

  const form = useForm({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      acceptedTerms: false,
    },
    onSubmit: ({ value }) => {
      console.log('Form is valid:', value);
    },
  });

  return (
    // inline style changes background/text color based on theme value
    <div
      style={{
        backgroundColor: theme === 'dark' ? '#121212' : '#ffffff',
        color: theme === 'dark' ? '#ffffff' : '#121212',
        minHeight: '100vh',
        padding: '20px',
      }}
    >
      <button type="button" onClick={toggleTheme}>
        Switch to {theme === 'dark' ? 'light' : 'dark'} mode
      </button>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
        noValidate
      >
        <form.Field
          name="name"
          validators={{
            onBlur: ({ value }) => (!value.trim() ? 'Please enter your name.' : undefined),
          }}
        >
          {(field) => (
            <div>
              <label htmlFor={field.name}>Name</label>
              <input
                id={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
              />
              {!field.state.meta.isValid && <p>{field.state.meta.errors.join(', ')}</p>}
            </div>
          )}
        </form.Field>

        <form.Field
          name="email"
          validators={{
            onBlur: ({ value }) => {
              if (!value.trim()) return 'Please enter your email.';
              if (!value.includes('@') || !value.includes('.')) return 'Please enter a valid email.';
              return undefined;
            },
          }}
        >
          {(field) => (
            <div>
              <label htmlFor={field.name}>Email</label>
              <input
                id={field.name}
                type="email"
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
              />
              {!field.state.meta.isValid && <p>{field.state.meta.errors.join(', ')}</p>}
            </div>
          )}
        </form.Field>

        <form.Field
          name="password"
          validators={{
            onBlur: ({ value }) => {
              if (!value) return 'Please enter a password.';
              if (value.length < 8) return 'Password must be at least 8 characters.';
              return undefined;
            },
          }}
        >
          {(field) => (
            <div>
              <label htmlFor={field.name}>Password</label>
              <input
                id={field.name}
                type="password"
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
              />
              {!field.state.meta.isValid && <p>{field.state.meta.errors.join(', ')}</p>}
            </div>
          )}
        </form.Field>

        <form.Field
          name="confirmPassword"
          validators={{
            onBlur: ({ value, fieldApi }) => {
              const password = fieldApi.form.getFieldValue('password');
              return value !== password ? 'Passwords do not match.' : undefined;
            },
          }}
        >
          {(field) => (
            <div>
              <label htmlFor={field.name}>Confirm Password</label>
              <input
                id={field.name}
                type="password"
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
              />
              {!field.state.meta.isValid && <p>{field.state.meta.errors.join(', ')}</p>}
            </div>
          )}
        </form.Field>

        <form.Field
          name="acceptedTerms"
          validators={{
            onChange: ({ value }) => (!value ? 'You must accept the terms.' : undefined),
          }}
        >
          {(field) => (
            <div>
              <label>
                <input
                  type="checkbox"
                  checked={field.state.value}
                  onChange={(e) => field.handleChange(e.target.checked)}
                />
                I accept the terms and conditions
              </label>
              {!field.state.meta.isValid && <p>{field.state.meta.errors.join(', ')}</p>}
            </div>
          )}
        </form.Field>

        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default App;