# Objective

The objective of this test is to create a small web-based email application. Each requirement is there for a very specific reason and will test your skills as a PHP developer at Mailbird. If you have any questions before you start the test please don't hesitate to ask. Better to ask an extra time and do things right than not to ask and do things wrong.

Note that the hiring decision will primarily be based on your performance on this test, and if you perform well on it there's a good chance we will offer you the position, as we only send it to candidates we find especially interesting. The final result should show:

- Your ability to learn and work with an unfamiliar (presumably) set of functions.
- Your attention to detail when reading instructions and your ability to work alone.
- Your ability to create a solid architecture and to avoid code duplication and other code smells.
- Your ability to improve upon and structure a responsive website.
- Your ability to set up and work with Docker.

# Requirements

- Improve the existing HTML and CSS to follow best practices.
- Connect, using the native IMAP and POP3 mail functions in PHP, to a mail server of the type specified in the 'Server type' combobox. The options should be 'IMAP' and 'POP3'. The encryption options should be 'Unencrypted', 'SSL/TLS' and 'STARTTLS'.
- Clicking 'Start' should connect to the server, and the email envelopes/headers (not the entire email) for all emails in the inbox should be downloaded and displayed in the left box as they download. The columns should at least include 'From', 'Subject' and 'Date'.
- Clicking on an email in the list should select it, download the body HTML (if available), and then it should be rendered inside the box on the right side.

# PHP mail functions and testing

https://www.php.net/manual/en/book.imap.php should be used for both IMAP an POP3 (see bottom of that page for POP3 examples).

You're free to use any email provider for testing, but note that Google disables username and password authentication by default.

[GMX](https://www.gmx.com) is otherwise a very good and fast email provider that supports everything with free email accounts.

# What we look for in particular

- Embrace the KISS design principle. Simple is better than complex.
- The site as a whole, including the existing HTML and CSS, is free from code smells and follows best practices.
- The site is responsive and works well on mobile.
- Code duplication is kept to a minimum by using inheritance and otherwise unifying code.
- The solution directories and files are nicely structured.
- The coding standard adheres to https://www.php-fig.org/psr/psr-12

# Handing in the solution

First, create a Docker container with the site. It should be ready to attach in Linux for evaluation.

Then send both the container and all source code to mo@getmailbird.com, either in a zipped file or hosted online.

If for whatever reason you're unable to complete all of the requirements, make a note of what you didn't complete, how you would have done it, and make sure that what IS completed is working perfectly and the code is nice and clean.
