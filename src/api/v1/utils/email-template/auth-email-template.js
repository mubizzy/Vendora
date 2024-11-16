const config = require('../../../../config/global');

const baseUrl = `${config.CLIENT_ORIGIN}`;
const authBaseUrl = `${baseUrl}/auth`;

exports.signup = ({ user }) => ({
  to: user.email,
  subject: `Welcome to ${config.APP_NAME}`,
  html: `<div style="font-family: Arial, sans-serif; margin: 0; padding: 0; color: #333;">
          <div style="max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 5px;">
              <div style="text-align: center;">
                    <img src="cid:companyLogo" alt="${config.APP_NAME}" style="max-width: 150px; margin-bottom: 20px; border: 1px solid #ddd; border-radius: 6px; padding: 10px;">
                </div>
              <h2 style="text-align: center; color: #333;">Welcome to RISH SHOP, ${user.name}!</h2>
              <p>We're thrilled to have you join our community at <strong>RISH SHOP</strong>! 🎉</p>
              <p>You're now one step closer to unlocking a world of exclusive products and deals. Your account has been successfully created, and you're ready to explore all that we have to offer.</p>
              
              <p>To ensure the security of your account, please verify your email address by clicking the button below:</p>
              
              <div style="text-align: center; margin: 20px 0;">
                  <a href="${authBaseUrl}/email-verification?email=${user.email}&token=${user.emailVerificationToken}" style="background-color: #d9534f; color: #ffffff; padding: 10px 20px; text-decoration: none; border-radius: 5px; font-size: 16px; font-weight: bold;">Verify Your Email</a>
              </div>
              
              <p>If you have any questions or need assistance, feel free to reach out to us. Our team is here to help and ensure you have a smooth and enjoyable experience with us.</p>
              
              <p>Once again, welcome aboard! We can't wait for you to explore everything <strong>RISH SHOP</strong> has in store.</p>
              
              <p>Best regards,</p>
              <p><strong>The RISH SHOP Team</strong></p>
          </div>
      </div>
      `,
});

exports.resendEmailVerificationToken = ({ user, token }) => ({
  to: user.email,
  subject: `Email Verification Link for ${config.APP_NAME}`,
  html: `<div style="font-family: Arial, sans-serif; margin: 0; padding: 0; color: #333;">
          <div style="max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 5px;">
              <div style="text-align: center;">
                    <img src="cid:companyLogo" alt="${config.APP_NAME}" style="max-width: 150px; margin-bottom: 20px; border: 1px solid #ddd; border-radius: 6px; padding: 10px;">
                </div>
              
              <h2 style="text-align: center; color: #333;">Email Verification for RISH SHOP</h2>
              
              <p>Dear ${user.name},</p>
              
              <p>To ensure the security of your account, please verify your email address by clicking the button below:</p>
              
              <div style="text-align: center; margin: 20px 0;">
                  <a href="${authBaseUrl}/email-verification?email=${user.email}&token=${token}" style="background-color: #d9534f; color: #ffffff; padding: 10px 20px; text-decoration: none; border-radius: 5px; font-size: 16px; font-weight: bold;">Verify Your Email</a>
              </div>
              
              <p>If you have any questions or need assistance, feel free to reach out to us. Our team is here to help and ensure you have a smooth and enjoyable experience with us.</p>
              
              <p>Once again, welcome aboard! We can't wait for you to explore everything <strong>RISH SHOP</strong> has in store.</p>

              <p>If you have any questions or need assistance, feel free to reach out to our support team at <a href="mailto:${config.MAIL_FROM}" style="color: #d9534f; text-decoration: none;">${config.MAIL_FROM}</a>. We’re here to help!</p>
              
              <p>Best regards,</p>
              <p><strong>The RISH SHOP Team</strong></p>
          </div>
      </div>`,
});

exports.emailVerificationConfirmation = ({ user }) => ({
  to: user.email,
  subject: `Email Verification Confirmation - Welcome to ${config.APP_NAME}!`,
  html: `<div style="font-family: Arial, sans-serif; margin: 0; padding: 0; color: #333;">
          <div style="max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 5px;">
              <div style="text-align: center;">
                    <img src="cid:companyLogo" alt="${config.APP_NAME}" style="max-width: 150px; margin-bottom: 20px; border: 1px solid #ddd; border-radius: 6px; padding: 10px;">
              </div>
              <h2 style="text-align: center; color: #333;">Welcome to ${config.APP_NAME}, ${user.name}!</h2>
              
              <p>We are thrilled to welcome you to <strong>${config.APP_NAME}</strong>! Your email address has been successfully verified, completing your registration with us.</p>
              
              <p>This verification step allows us to communicate with you effectively and securely, ensuring you have access to all the exclusive features and benefits our platform provides.</p>
              
              <p>Thank you for confirming your email address. We’re excited to have you as part of our community, and we look forward to supporting you on your journey with us!</p>
              
              <p>If you have any questions or need assistance, please feel free to reach out to our support team at <a href="mailto:${config.MAIL_FROM}" style="color: #d9534f; text-decoration: none;">${config.MAIL_FROM}</a>. We’re here to help!</p>
              
              <p>Best regards,</p>
              <p><strong>The ${config.APP_NAME} Team</strong></p>
          </div>
      </div>`,
});

exports.forgotPasswordToken = ({ user, token }) => ({
  to: user.email,
  subject: `Password Reset Link for Your ${config.APP_NAME} Account`,
  html: `<div style="font-family: Arial, sans-serif; margin: 0; padding: 0; color: #333;">
            <div style="max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 5px;">
                <div style="text-align: center;">
                    <img src="cid:companyLogo" alt="${config.APP_NAME}" style="max-width: 150px; margin-bottom: 20px; border: 1px solid #ddd; border-radius: 6px; padding: 10px;">
                </div>
                <h2 style="text-align: center; color: #333;">Hello ${user.name},</h2>
                
                <p>We have received a request to reset your password for your <strong>${config.APP_NAME}</strong> account.</p>
                
                <p>To proceed, please click the button below to change your password. This link is valid for a limited time to ensure the security of your account.</p>
                
                <div style="text-align: center; margin: 20px 0;">
                <a href="${authBaseUrl}/reset-password?email=${user.email}&token=${token}" style="background-color: #d9534f; color: #fff; padding: 10px 20px; border-radius: 5px; text-decoration: none; font-weight: bold;">Change Password</a>
                </div>
                
                <p>If you didn’t request a password reset, please ignore this email. Your password will remain unchanged, and your account will remain secure.</p>
                
                <p>If you have any questions or need assistance, feel free to reach out to our support team at <a href="mailto:${config.MAIL_FROM}" style="color: #d9534f; text-decoration: none;">${config.MAIL_FROM}</a>. We’re here to help!</p>
                
                <p>Best regards,</p>
                <p><strong>The ${config.APP_NAME} Team</strong></p>
            </div>
            </div>`,
});

exports.resetPassword = ({ user }) => ({
  to: user.email,
  subject: `Password Reset Confirmation`,
  html: `<div style="font-family: Arial, sans-serif; margin: 0; padding: 0; color: #333;">
            <div style="max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 5px;">
                <div style="text-align: center;">
                    <img src="cid:companyLogo" alt="${config.APP_NAME}" style="max-width: 150px; margin-bottom: 20px; border: 1px solid #ddd; border-radius: 6px; padding: 10px;">
                </div>
                
                <h2 style="text-align: center; color: #333;">Password Reset Confirmation</h2>
                
                <p>Dear ${user.name},</p>
                
                <p>This is to confirm that the password for your account at <strong>${config.APP_NAME}</strong> has been successfully reset.</p>
                
                <p>If you initiated this password reset, you can now log in to your account using your new password.</p>
                
                <p>If you did not request this password reset, or if you have any concerns about the security of your account, please contact our support team immediately at <a href="mailto:${config.MAIL_FROM}" style="color: #d9534f; text-decoration: none;">${config.MAIL_FROM}</a>. Your security is our priority, and we’re here to help.</p>
                
                <p>Thank you for choosing <strong>${config.APP_NAME}</strong>. We’re glad to have you with us.</p>
                
                <p>Best regards,</p>
                <p><strong>The ${config.APP_NAME} Team</strong></p>
            </div>
        </div>`,
});

exports.changePassword = ({ user }) => ({
  to: user.email,
  subject: `Your Password has been Successfully Changed - ${config.APP_NAME}`,
  html: `<div style="font-family: Arial, sans-serif; margin: 0; padding: 0; color: #333;">
            <div style="max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 5px;">
                <div style="text-align: center;">
                    <img src="cid:companyLogo" alt="${config.APP_NAME}" style="max-width: 150px; margin-bottom: 20px; border: 1px solid #ddd; border-radius: 6px; padding: 10px;">
                </div>
                
                <h2 style="text-align: center; color: #333;">Password Change Confirmation</h2>
                
                <p>Dear ${user.name},</p>
                
                <p>This email is to confirm that the password for your <strong>${config.APP_NAME}</strong> account has been successfully changed.</p>
                
                <p>If you did not initiate this change, please contact our support team immediately at <a href="mailto:${config.MAIL_FROM}" style="color: #d9534f; text-decoration: none;">${config.MAIL_FROM}</a>. Ensuring the security of your account is our top priority, and we are here to assist you.</p>
                
                <p>Thank you for choosing <strong>${config.APP_NAME}</strong>. We appreciate having you as part of our community.</p>
                
                <p>Best regards,</p>
                <p><strong>The ${config.APP_NAME} Team</strong></p>
            </div>
        </div>
    `,
});

exports.contact = ({ contact }) => ({
  to: contact.email,
  subject: `Support Needed: ${contact.subject}`,
  html: `<div style="font-family: Arial, sans-serif; margin: 0; padding: 0; color: #333;">
            <div style="max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 5px;">
                <div style="text-align: center;">
                    <img src="cid:companyLogo" alt="${config.APP_NAME}" style="max-width: 150px; margin-bottom: 20px; border: 1px solid #ddd; border-radius: 6px; padding: 10px;">
                </div>

                <h2 style="text-align: center; color: #333;">User Support Request</h2>
                
                <p>I am reaching out regarding an issue with my account. Please find my details below and assist me at your earliest convenience:</p>
                
                <p><strong>Name:</strong> ${contact.firstName} ${contact.lastName}</p>
                <p><strong>Email:</strong> ${contact.email}</p>
                <p><strong>Phone:</strong> ${contact.phone}</p>
                <p><strong>Issue:</strong> ${contact.message}</p>
            </div>
            </div>
      `,
});

exports.subscriptionConfirmation = ({ subscription }) => ({
  to: subscription.email,
  subject: `Subscription Confirmation - Welcome to ${config.APP_NAME}`,
  html: `<div style="font-family: Arial, sans-serif; margin: 0; padding: 0; color: #333;">
                <div style="max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 5px;">
                    <div style="text-align: center;">
                        <img src="cid:companyLogo" alt="${config.APP_NAME}" style="max-width: 150px; margin-bottom: 20px; border: 1px solid #ddd; border-radius: 6px; padding: 10px;">
                    </div>
                    
                    <h2 style="text-align: center; color: #333;">Subscription Confirmation</h2>
                                        
                    <p>Welcome to <strong>${config.APP_NAME}</strong>! We are thrilled to have you as part of our community.</p>
                    
                    <p>This email confirms that your subscription to <strong>${config.APP_NAME}</strong> has been successfully activated.</p>
                    
                    <p>We look forward to providing you with exclusive content, updates, and special offers to enhance your experience.</p>
                    
                    <p>If you have any questions or need assistance, feel free to reach out to our support team at <a href="mailto:${config.MAIL_FROM}" style="color: #d9534f; text-decoration: none;">${config.MAIL_FROM}</a>.</p>
                    
                    <p>Thank you for choosing <strong>${config.APP_NAME}</strong>. We’re excited to embark on this journey with you.</p>
                    
                    <p>Best regards,</p>
                    <p><strong>The ${config.APP_NAME} Team</strong></p>
                </div>
            </div>
        `,
});
