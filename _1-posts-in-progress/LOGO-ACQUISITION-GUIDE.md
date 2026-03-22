# Logo Acquisition Guide - 10 Days of AD Security Series

This guide provides official sources for obtaining logos for each tool in the blog series.

## Logo Sources by Tool

### 1. BloodHound
- **Official Source:** https://github.com/SpecterOps/BloodHound
- **Logo Location:** GitHub repository social preview image or SpecterOps branding
- **Suggested Format:** PNG, 800x400px
- **Save As:** `bloodhound-logo.png`
- **Alternative:** Use BloodHound Community Edition icon from releases

### 2. Impacket
- **Official Source:** https://github.com/fortra/impacket
- **Logo Location:** Fortra (formerly Core Security) branding or GitHub avatar
- **Suggested Format:** PNG, 800x400px
- **Save As:** `impacket-logo.png`
- **Note:** Impacket doesn't have an official logo; use Fortra branding or simple text

### 3. Rubeus
- **Official Source:** https://github.com/GhostPack/Rubeus
- **Logo Location:** Part of GhostPack toolkit (Hagrid theme)
- **Suggested Format:** PNG, 800x400px
- **Save As:** `rubeus-logo.png`
- **Note:** May need to create simple text-based header

### 4. Mimikatz
- **Official Source:** https://github.com/gentilkiwi/mimikatz
- **Logo Location:** Gentil Kiwi (cat logo) from repository
- **Suggested Format:** PNG, 800x400px
- **Save As:** `mimikatz-logo.png`
- **Note:** Look for the kiwi/cat branding associated with the project

### 5. NetExec
- **Official Source:** https://github.com/Pennyw0rth/NetExec
- **Logo Location:** GitHub repository avatar or social card
- **Suggested Format:** PNG, 800x400px
- **Save As:** `netexec-logo.png`
- **Note:** Relatively new project, may not have extensive branding

### 6. Certipy
- **Official Source:** https://github.com/ly4k/Certipy
- **Logo Location:** Repository avatar or create certificate-themed image
- **Suggested Format:** PNG, 800x400px
- **Save As:** `certipy-logo.png`
- **Note:** Tool focuses on certificates; consider certificate icon

### 7. Sliver
- **Official Source:** https://github.com/BishopFox/sliver
- **Logo Location:** BishopFox official Sliver branding
- **Suggested Format:** PNG, 800x400px
- **Save As:** `sliver-logo.png`
- **Note:** Well-branded tool with official logo available

### 8. Responder
- **Official Source:** https://github.com/lgandx/Responder
- **Logo Location:** Repository or create network-themed image
- **Suggested Format:** PNG, 800x400px
- **Save As:** `responder-logo.png`
- **Note:** Long-standing tool but minimal branding

### 9. Evil-WinRM
- **Official Source:** https://github.com/Hackplayers/evil-winrm
- **Logo Location:** Hackplayers organization avatar or WinRM icon
- **Suggested Format:** PNG, 800x400px
- **Save As:** `evil-winrm-logo.png`
- **Note:** Consider PowerShell or remote management themed image

### 10. Coercer
- **Official Source:** https://github.com/p0dalirius/Coercer
- **Logo Location:** Repository avatar
- **Suggested Format:** PNG, 800x400px
- **Save As:** `coercer-logo.png`
- **Note:** Tool by Podalirius; check author's other project branding

## Directory Structure

Save all logos to:
```
assets/images/ad-tools-series/
├── bloodhound-logo.png
├── impacket-logo.png
├── rubeus-logo.png
├── mimikatz-logo.png
├── netexec-logo.png
├── certipy-logo.png
├── sliver-logo.png
├── responder-logo.png
├── evil-winrm-logo.png
└── coercer-logo.png
```

## Copyright Notice

All logos are property of their respective creators and projects. Use only for educational and editorial purposes in this blog series. Respect each project's license and trademark guidelines.

## Alternative: Text-Based Headers

If official logos are not available, consider creating simple, professional text-based headers with:
- Tool name in monospace or security-themed font
- GitHub star count badge
- Simple icon representing the tool's function
- Consistent color scheme across all 10 posts

## Recommended Tools for Creating Text Headers

- **Canva:** Free templates for blog headers
- **Figma:** Professional design tool
- **GIMP:** Open-source image editor
- **ImageMagick:** Command-line image creation

```bash
# Example ImageMagick command for text header
convert -size 800x400 xc:black \
  -font DejaVu-Sans-Mono-Bold -pointsize 72 -fill white \
  -gravity center -annotate +0+0 "BloodHound" \
  bloodhound-logo.png
```

## Manual Download Instructions

1. Visit each GitHub repository
2. Look for `docs/`, `assets/`, or `branding/` directories
3. Check repository social preview in Settings → Options
4. Download or screenshot appropriate branding
5. Resize to 800x400px for consistency
6. Save with filename from this guide
7. Place in `assets/images/ad-tools-series/` directory

## Placeholder Images

The blog posts currently reference these images. Until you add the actual logos, you may want to:
1. Create simple placeholders with tool names
2. Use generic security/hacking themed icons
3. Leave images commented out until logos are acquired

---

**Note:** Logo acquisition was identified as the final step in the Algorithm execution. All blog post content is complete and professional; logos enhance but are not critical for technical accuracy.
