(function ($) {
  "use strict";
  var form = $(".contact-form"),
    successMessage = $(".messenger-box-contact__msg"),
    errorMessage = $(".messenger-box-contact__msg-error"),
    form_data;

  // Initialize EmailJS
  // STEP 1: Get your Public Key from EmailJS Dashboard → Account → General
  // STEP 2: Replace "YOUR_PUBLIC_KEY" below with your actual Public Key
  // Get your keys from https://www.emailjs.com/
  (function() {
    emailjs.init("FvmoNWoAU6ibdn6KZ"); // EmailJS Public Key
  })();

  // Success function
  function done_func(response) {
    successMessage.fadeIn().removeClass("alert-danger").addClass("alert-success");
    successMessage.text("Your message was sent successfully! I'll get back to you soon.");
    errorMessage.fadeOut();
    setTimeout(function () {
      successMessage.fadeOut();
    }, 5000);
    form[0].reset();
    // Remove invalid classes
    form.find('input, textarea').removeClass('invalid');
    document.getElementById("required-msg").classList.remove("show");
  }

  // fail function
  function fail_func(error) {
    errorMessage.fadeIn().removeClass("alert-success").addClass("alert-danger");
    errorMessage.text("There was an error sending your message. Please try again or email directly at yatharthdevelops@gmail.com");
    successMessage.fadeOut();
    setTimeout(function () {
      errorMessage.fadeOut();
    }, 5000);
    console.error("EmailJS error:", error);
  }

  // Validation function
  function validateForm() {
    const requiredMsg = document.getElementById("required-msg");
    const fullName = document.getElementById("full-name");
    const email = document.getElementById("email");
    const subject = document.getElementById("subject");
    let isValid = true;

    // Remove previous invalid classes
    form.find('input, textarea').removeClass('invalid');

    // Validate required fields
    if (!fullName.value || fullName.value.trim() === "") {
      fullName.classList.add("invalid");
      isValid = false;
    }

    if (!email.value || !isValidEmail(email.value)) {
      email.classList.add("invalid");
      isValid = false;
    }

    if (!subject.value || subject.value.trim() === "") {
      subject.classList.add("invalid");
      isValid = false;
    }

    if (!isValid) {
      requiredMsg.classList.add("show");
    } else {
      requiredMsg.classList.remove("show");
    }

    return isValid;
  }

  // Email validation
  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  form.submit(function (e) {
    e.preventDefault();

    // Validate form
    if (!validateForm()) {
      return false;
    }

    // Get form values
    const budgetValue = document.getElementById("budget").value;
    const currencyValue = document.getElementById("currency").value;
    const senderEmail = document.getElementById("email").value;
    
    const formData = {
      to_email: "yatharthdevelops@gmail.com",
      to_name: "Yatharth",
      from_name: document.getElementById("full-name").value,
      from_email: senderEmail,
      reply_to: senderEmail,
      phone: document.getElementById("phone-number").value || "Not provided",
      subject: document.getElementById("subject").value,
      budget: budgetValue || "Not provided",
      currency: currencyValue || "Not provided",
      budget_display: budgetValue && currencyValue ? `${budgetValue} ${currencyValue}` : "Not provided",
      message: document.getElementById("message").value || "No message provided",
      website: "Yatharth Portfolio Website"
    };

    // Show loading state
    const submitBtn = document.getElementById("submit-form");
    const originalText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="las la-spinner la-spin"></i> Sending...';

    // Send email using EmailJS
    // STEP 3: Get your Service ID from EmailJS Dashboard → Email Services
    // STEP 4: Get your Template ID from EmailJS Dashboard → Email Templates
    // STEP 5: Replace the IDs below with your actual IDs
    emailjs.send(
      'service_pf8tt0i',  // EmailJS Service ID
      'template_86e8lwx', // EmailJS Template ID
      formData
    )
      .then(function(response) {
        console.log('SUCCESS!', response.status, response.text);
        done_func(response);
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
      }, function(error) {
        console.log('FAILED...', error);
        fail_func(error);
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
      });
  });
})(jQuery);
