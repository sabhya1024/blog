<h1>Security Measures and Defenses</h1>

<p>The Secure MERN Blog Platform is designed with a <strong>secure-by-default</strong> philosophy, following OWASP Top 10 guidelines to defend against common web vulnerabilities.</p>

<h2>1. Authentication and Credential Defense</h2>
<ul>
  <li><strong>Password Hashing (Argon2id)</strong>
    <ul>
      <li>OWASP: A02 – Cryptographic Failures</li>
      <li>Passwords are hashed using Argon2id with memory cost and multiple iterations to resist brute-force attacks, including GPU attacks.</li>
    </ul>
  </li>
  <li><strong>Session Isolation (HttpOnly Cookies)</strong>
    <ul>
      <li>OWASP: A07 – Identification Failures</li>
      <li>JWT tokens are stored in HttpOnly cookies, inaccessible to client-side JavaScript, mitigating XSS-based token theft.</li>
    </ul>
  </li>
  <li><strong>Tiered Rate Limiting</strong>
    <ul>
      <li>OWASP: A04 – Insecure Design / Resource Exhaustion</li>
      <li>Critical endpoints (/signin, /signup) are limited to 7 attempts/hour to prevent brute-force attacks without affecting normal traffic.</li>
    </ul>
  </li>
  <li><strong>Hybrid Login / Account Merging</strong>
    <ul>
      <li>OWASP: A07 – Identification Failures</li>
      <li>Google OAuth login merges with existing accounts safely, ensuring users cannot bypass authentication while maintaining a smooth UX.</li>
    </ul>
  </li>
</ul>

<h2>2. Injection and Data Integrity</h2>
<ul>
  <li><strong>Input Sanitization</strong>
    <ul>
      <li>OWASP: A03 – Injection (XSS)</li>
      <li>All user input (title, description, tags) is sanitized using <code>validator.escape()</code> to convert HTML characters into harmless entities.</li>
    </ul>
  </li>
  <li><strong>Data Type Enforcement (Mongoose)</strong>
    <ul>
      <li>OWASP: A03 – Injection (NoSQL)</li>
      <li>Mongoose validates data types and prevents operators like <code>$gt</code> from being injected into string fields, reducing NoSQL injection risks.</li>
    </ul>
  </li>
  <li><strong>URL Validation</strong>
    <ul>
      <li>OWASP: A03 – Injection</li>
      <li>Blog banner URLs are strictly validated with <code>validator.isURL</code> to enforce HTTPS and prevent malicious URLs from being saved.</li>
    </ul>
  </li>
</ul>

<h2>3. Access Control and Server Hardening</h2>
<ul>
  <li><strong>Granular Authorization (verifyJWT middleware)</strong>
    <ul>
      <li>OWASP: A01 – Broken Access Control</li>
      <li>Routes like <code>/create-blog</code> only allow the authenticated user (from validated JWT) to post, preventing IDOR attacks.</li>
    </ul>
  </li>
  <li><strong>Server Headers / Hardening (Helmet)</strong>
    <ul>
      <li>OWASP: A05 – Security Misconfiguration</li>
      <li>Helmet middleware removes sensitive headers like <code>X-Powered-By</code> to make server fingerprinting harder.</li>
    </ul>
  </li>
  <li><strong>Non-guessable Unique IDs</strong>
    <ul>
      <li>OWASP: A01 – Broken Access Control</li>
      <li>Blog IDs use  nanoid, making them non-sequential and preventing automated enumeration attacks.</li>
    </ul>
  </li>
</ul>
