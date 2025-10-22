# **App Name**: DevFlow Manager

## Core Features:

- Dashboard View: Display a table of existing development tasks fetched from the ClickUp API, showing key details.
- DED-Based Development Creation: Allow users to initiate new developments using a DED template, triggered via a modal.
- Custom Development Creation: Allow users to initiate new developments completely from scratch, triggered via a modal.
- n8n Integration: Send development details to n8n via webhooks for document generation, handling data like names, clients, and file uploads.
- HTML Editor: Provide a full-screen HTML editor (WYSIWYG or code-based) to modify the generated document content received from n8n as a tool. Decoded base64 received from n8n populates the HTML editor.
- Document Saving and Submission: Capture the modified HTML content from the editor, convert it to base64, and send it back to n8n via webhook for final processing and save it in the ClickUp
- API Configuration: Allow admin users to configure ClickUp API keys, n8n webhook URLs, and other relevant settings through an admin UI. Make the setting persistent with the use of the 'useLocalStorage' hook. Store the parameters to the user's local browser to allow seamless functionality.

## Style Guidelines:

- Primary color: Deep purple (#673AB7), echoing the branding, conveys sophistication and modernity.
- Background color: Light purple (#F3E5F5) for a subtle backdrop, ensuring content clarity.
- Accent color: A violet-pink (#BA68C8) complements the primary hue for interactive elements.
- Body and headline font: 'Poppins' (sans-serif) ensures readability and a clean aesthetic. Note: currently only Google Fonts are supported.
- Lucide or Heroicons are used for interface elements and actions; keeping visual language lightweight.
- Modern, minimalist layout featuring softened borders (12px border-radius) and ample whitespace, promoting a clutter-free user experience.
- Use subtle transitions and animations for modal appearances and data loading to provide a smooth user experience.