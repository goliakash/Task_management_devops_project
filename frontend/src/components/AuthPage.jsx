function AuthPage({ title, emailId, passwordId }) {
  return (
    <section className="form-page">
      <h2>{title}</h2>
      <form className="auth-form">
        <label htmlFor={emailId}>Email</label>
        <input id={emailId} type="email" />

        <label htmlFor={passwordId}>Password</label>
        <input id={passwordId} type="password" />

        <button type="submit">Submit</button>
      </form>
    </section>
  )
}

export default AuthPage
