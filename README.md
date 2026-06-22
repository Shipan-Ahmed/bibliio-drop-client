This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.


Button Type	Purpose / Action	Recommended Color Pairing	Tailwind CSS Classes
Sign In	Primary Entry	Indigo / Royal Blue + White text	bg-indigo-600 text-white hover:bg-indigo-700
Sign Up	Primary Conversion	Indigo / Royal Blue + White text	bg-indigo-600 text-white hover:bg-indigo-700
Save	Success / Confirmation	Deep Emerald Green + White text	bg-emerald-600 text-white hover:bg-emerald-700
Browse Here	Secondary Exploration	Clear/White background + Slate Border & Text	bg-white border border-slate-300 text-slate-700 hover:bg-slate-50
Log Out	Neutral System Action	Muted Slate/Gray background + Dark Gray text	bg-slate-100 text-slate-700 hover:bg-slate-200
Delete	Destructive Action	Crimson Red + White text	bg-red-600 text-white hover:bg-red-700
💡 Design Alignment Strategy
Sign In vs. Sign Up: Since both are primary actions, keep them in the same brand color family (e.g., Indigo). However, if they are on the same page together, make Sign In the solid button (bg-indigo-600) and Sign Up an outline style (border border-indigo-600 text-indigo-600) so they don't fight for attention.

The "Browse Here" Look: This is a classic "Ghost" or "Outline" button. It shouldn't look heavy because it encourages exploration rather than finalizing a transaction.

Log Out vs. Delete: Always distinguish these two! Log Out is safe, so it gets a quiet, neutral gray. Delete is permanent, so the bright crimson red serves as a necessary visual warning.

🛠️ Quick UI Framework Shortcut
If you are using your UI library, you can map them natively like this:

Sign In / Sign Up / Save: btn btn-primary or btn btn-success

Browse Here: btn btn-outline

Log Out: btn btn-neutral

Delete: btn btn-error