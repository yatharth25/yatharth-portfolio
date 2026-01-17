# EmailJS Setup Instructions

Your contact form is now configured to use EmailJS to send emails. Follow these steps to set it up:

## Step 1: Create EmailJS Account
1. Go to https://www.emailjs.com/
2. Sign up for a free account (allows 200 emails/month)

## Step 2: Create an Email Service
1. In EmailJS dashboard, go to "Email Services"
2. Click "Add New Service"
3. Choose your email provider (Gmail recommended)
4. Connect your Gmail account
5. Copy the **Service ID** (you'll need this)

## Step 3: Create an Email Template
1. Go to "Email Templates"
2. Click "Create New Template"
3. Use this template:

**Template Name:** Portfolio Contact Form

**Subject:** New Contact from Portfolio: {{subject}}

**Content:**
```
Hello Yatharth,

You have received a new message from your portfolio website.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CONTACT DETAILS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Name: {{from_name}}
Email: {{from_email}}
Phone: {{phone}}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PROJECT DETAILS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Subject: {{subject}}
Budget: {{budget_display}}
  Amount: {{budget}}
  Currency: {{currency}}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
MESSAGE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

{{message}}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

This email was sent from your portfolio website ({{website}})
Reply directly to this email to respond to: {{from_email}}
```

4. **IMPORTANT - Set Reply-To:**
   - In the template editor, scroll down to "Settings"
   - Find "Reply To" field
   - Set it to: `{{reply_to}}` or `{{from_email}}`
   - This ensures when you click "Reply", it goes to the sender's email

5. Save the template and copy the **Template ID**

## Step 4: Get Your Public Key
1. Go to "Account" → "General"
2. Copy your **Public Key**

## Step 5: Update the Code
Open `assets/js/ajax-form.js` and replace these three values:

1. Line 8: Replace `YOUR_PUBLIC_KEY` with your EmailJS Public Key
2. Line 88: Replace `YOUR_SERVICE_ID` with your EmailJS Service ID
3. Line 89: Replace `YOUR_TEMPLATE_ID` with your EmailJS Template ID

## Example:
```javascript
emailjs.init("abc123xyz"); // Your Public Key

emailjs.send(
  'service_abc123',  // Your Service ID
  'template_xyz789', // Your Template ID
  { ... }
)
```

## Testing
1. Fill out the contact form on your website
2. Submit it
3. Check your email inbox
4. You should receive an email with all the form details

## Notes:
- **Important:** The "From" email will always show your service email (yatharthdevelops@gmail.com) - this is how EmailJS works for security
- **Reply-To is set correctly:** When you click "Reply" in your email, it will reply to the sender's email address
- The email will clearly identify it's from your portfolio website
- All form fields (name, email, phone, subject, budget, currency, message) will be included
- Budget and currency are shown both separately and combined (e.g., "5000 INR")
- Free plan allows 200 emails per month

## Troubleshooting:
- Make sure all three IDs are correctly replaced
- Check browser console for any errors
- Verify your EmailJS service is connected and active
- Ensure your template variables match the form data keys
