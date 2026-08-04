# Deployment Guide

This portfolio site can be hosted on either **Vercel** or **Cloudflare Pages**.

## Vercel

1. Go to [vercel.com](https://vercel.com)
2. Connect your GitHub account and import this repository
3. Vercel will auto-detect the setup
4. Deploy — your site will be live at a `.vercel.app` domain

**Custom Domain:**
- Point your domain DNS to Vercel
- Add domain in Vercel project settings

## Cloudflare Pages

1. Go to [Cloudflare Pages](https://pages.cloudflare.com)
2. Connect your GitHub account and select this repository
3. **Build Settings:**
   - Framework: None (static site)
   - Build command: (leave empty)
   - Build output directory: (leave empty)
4. Deploy — your site will be live at a `.pages.dev` domain

**Custom Domain:**
- Add domain to Cloudflare
- Configure nameservers
- Point to Pages in dashboard

## Recommended

**Vercel** for simplicity and speed — best for static sites.  
**Cloudflare Pages** if you're already using Cloudflare for DNS.

Both platforms offer free hosting with generous limits.
