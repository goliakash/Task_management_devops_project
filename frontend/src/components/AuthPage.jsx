import { useState } from 'react'

function AuthPage({ title, emailId, passwordId, onSubmit, submitLabel }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function handleSubmit(event) {
    event.preventDefault()

    if (!email || !password) {
      alert('Email and password are required.')
      return
    }

    setIsSubmitting(true)

    try {
      await onSubmit({ email, password })
      setPassword('')
    } catch (error) {
      alert(error.message || 'Authentication failed.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="form-page">
      <h2>{title}</h2>
      <form className="auth-form" onSubmit={handleSubmit}>
        <label htmlFor={emailId}>Email</label>
        <input
          id={emailId}
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />

        <label htmlFor={passwordId}>Password</label>
        <input
          id={passwordId}
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : submitLabel || 'Submit'}
        </button>
      </form>
    </section>
  )
}

export default AuthPage
