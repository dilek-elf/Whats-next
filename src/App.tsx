import { useState } from 'react';
import './App.css';

type FormData = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  acceptedTerms: boolean;
};

function validate(values: FormData) {
  const errors: Partial<Record<keyof FormData, string>> = {};

  if (!values.name.trim()) errors.name = 'Please enter your name.';

  if (!values.email.trim()) {
    errors.email = 'Please enter your email.';
  } else if (!values.email.includes('@') || !values.email.includes('.')) {
    // simple check: email must contain @ and a dot, nothing fancy
    errors.email = 'Please enter a valid email.';
  }

  if (!values.password) {
    errors.password = 'Please enter a password.';
  } else if (values.password.length < 8) {
    errors.password = 'Password must be at least 8 characters.';
  }

  if (values.password !== values.confirmPassword) {
    errors.confirmPassword = 'Passwords do not match.';
  }

  if (!values.acceptedTerms) errors.acceptedTerms = 'You must accept the terms.';

  return errors;
}

function App() {
  const [formData, setFormData] = useState<FormData>({
    name: '', email: '', password: '', confirmPassword: '', acceptedTerms: false,
  });
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function handleCheckboxChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: checked }));
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const nextErrors = validate(formData);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;
    console.log('Form is valid:', formData);
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div>
        <label htmlFor="name">Name</label>
        <input id="name" name="name" value={formData.name} onChange={handleChange} />
        {errors.name && <p>{errors.name}</p>}
      </div>
      <div>
        <label htmlFor="email">Email</label>
        <input id="email" name="email" type="email" value={formData.email} onChange={handleChange} />
        {errors.email && <p>{errors.email}</p>}
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input id="password" name="password" type="password" value={formData.password} onChange={handleChange} />
        {errors.password && <p>{errors.password}</p>}
      </div>
      <div>
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input id="confirmPassword" name="confirmPassword" type="password" value={formData.confirmPassword} onChange={handleChange} />
        {errors.confirmPassword && <p>{errors.confirmPassword}</p>}
      </div>
      <div>
        <label>
          <input name="acceptedTerms" type="checkbox" checked={formData.acceptedTerms} onChange={handleCheckboxChange} />
          I accept the terms and conditions
        </label>
        {errors.acceptedTerms && <p>{errors.acceptedTerms}</p>}
      </div>
      <button type="submit">Register</button>
    </form>
  );
}

export default App;