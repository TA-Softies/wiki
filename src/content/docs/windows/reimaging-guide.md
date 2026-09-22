---
title: Lab Drive Reimaging Guide
description: Reimage SATA/NVMe lab workstation drives using Clonezilla at the TechCentre Reimaging Station.
---

## Overview

This guide provides step-by-step instructions for reimaging SATA/NVMe drives using the Reimaging Station in TechCentre. The process uses Clonezilla to restore lab workstation drives to a clean, standardized state with pre-configured Windows Lab images.

:::caution[Lab PCs ONLY]
**CRITICAL:** This reimaging process is **ONLY** applicable to **Lab PCs/Workstations**.
- **DO NOT** use this process on student personal computers
- **DO NOT** use this process on any non-lab equipment

Lab images are specifically configured for lab environments and will not work properly on other systems. Reimaging personal or non-lab computers may result in system failure, data loss, and licensing issues.
:::

:::danger[Reimaging is a last resort]
**IMPORTANT:** Reimaging should only be performed as a **very last step** after all other troubleshooting methods have been exhausted. Before reimaging:
- Attempt standard Windows troubleshooting (SFC scan, DISM)
- Check for hardware issues (RAM, cables, connections)
- Try startup repair and safe mode
- Consult with Software FU members if unsure

Reimaging completely erases the drive and should only be used when the system is unrecoverable through other means.
:::

:::caution[TechCentre Reimaging Station]
This guide is specifically designed for use at the **Reimaging Station in TechCentre**. All necessary equipment, including the Clonezilla USB drive and SATA adapter, should be available at the station. Contact any Software FU member if any equipment is missing.
:::

:::note
Currently, only SATA drives are supported due to adapter availability. NVMe support will be added once the appropriate adapters are obtained.
:::

## Prerequisites

- **Verification that the system is a Lab PC** (not a personal computer)
- **Confirmation that reimaging is necessary** (all other troubleshooting has failed)
- Access to the Reimaging Station in TechCentre
- Clonezilla USB drive (provided at the station)
- SATA adapter (currently available at the station)
- The lab SSD drive to be reimaged (typically 1TB)
- Basic understanding of BIOS/boot menus

:::danger
**Data Loss Warning:** Reimaging will completely erase all data on the target drive. Ensure any important data is backed up before proceeding. This is an irreversible operation.
:::

## Available Images

The reimaging station has two standard lab images available:

| Image Name | Operating System | Description |
|------------|-----------------|-------------|
| **LAB_IMAGE_23R2-WIN10** | Windows 10 (Version 23H2) | Standard Windows 10 lab configuration |
| **LAB_IMAGE_24H2-WIN11** | Windows 11 (Version 24H2) | Latest Windows 11 lab configuration |

:::note
Both images come pre-configured with standard lab software and settings. Choose the image based on the lab requirements or the original configuration of the workstation.
:::

## Reimaging Process

### Step 1: Prepare the Reimaging Station

1. **Locate the Equipment**
   - Ensure the Reimaging Station PC is powered on
   - Ensure the Clonezilla USB drive is plugged in (should be labeled & plugged-in to the back of the PC)
   - Locate the SATA adapter cable

<!-- TODO: Add image of the reimaging station setup -->

:::note
If you cannot find the Clonezilla USB or SATA adapter, inform any Software FU member.
:::

2. **Connect the Drive**
   - Connect the lab PC SSD to the SATA adapter
   - Ensure the connection is secure

<!-- TODO: Add image showing SATA connection -->

3. **Insert Clonezilla USB**
   - Insert the Clonezilla USB drive into an available USB port
   - Ensure it's fully inserted and recognized

---

### Step 2: Boot into Clonezilla

1. **Power On and Access Boot Menu**
   - Power on the Reimaging Station
   - Immediately press the boot menu key (typically **F12**, **F11**, or **ESC**)
   - If you miss it, restart and try again

<!-- TODO: Add image of boot menu screen -->

:::note
The exact key depends on the motherboard manufacturer. Common keys are F12 (Dell/Lenovo), F11 (HP), or ESC (ASUS).
:::

2. **Select Clonezilla USB**
   - From the boot menu, select the USB drive (may be labeled as "SanDisk" or show the drive manufacturer)
   - Press **Enter** to boot

3. **Clonezilla Boot Options**
   - When Clonezilla loads, select the default option: **Clonezilla live (VGA 800x600)**
   - Press **Enter**

<!-- TODO: Add image of Clonezilla boot screen -->

---

### Step 3: Configure Clonezilla

1. **Language Selection**
   - Select your preferred language (default is **English**)
   - Press **Enter**

2. **Keyboard layout Configuration**
   - Select **Keep** (recommended)
   - Press **Enter**

3. **Start Clonezilla**
   - Select **Start_Clonezilla**
   - Press **Enter**

<!-- TODO: Add image of Clonezilla main menu -->

4. **Choose Mode**
   - Select **device-image** (work with disks or partitions using images)
   - Press **Enter**

5. **Mount Image Directory**
   - Select **local_dev** (use local device for image storage)
   - Press **Enter**
   - Wait for Clonezilla to detect available drives

:::caution
Make sure you can identify which drive contains the backup images (usually an 1TB NVMe drive inside the station).
:::

---

### Step 4: Select and Restore Image

1. **Choose Image Source**
   - Clonezilla will display all available drives
   - Select the drive that contains the lab images (Partition usually starts with _nvme0n1_)
   - Press **Enter**

<!-- TODO: Add image showing drive selection -->

2. **Select Image Directory**
   - Navigate to the directory containing the images
   - Press **Tab** twice to navigate to the **Done** button
   - Press **Enter** to continue

3. **Clonezilla Mode**
   - Select **Expert mode** (recommended)
   - Press **Enter**

4. **Operation Selection**
   - Select **restoredisk** (restore image to local disk)
   - Press **Enter**

<!-- TODO: Add image of operation selection -->

5. **Choose Image**
   - You will see a list of available images
   - Select the appropriate image:
     - **LAB_IMAGE_23R2-WIN10** for Windows 10
     - **LAB_IMAGE_24H2-WIN11** for Windows 11
   - Press **Enter**

:::note
Image names may have timestamps or version numbers appended. Choose the most recent version unless instructed otherwise.
:::

6. **Advanced Extra Options**
   - Choose **-k1** to restore the image with proportional partition sizes
   - Press **Enter**

7. **Select Target Drive**
   - Clonezilla will display all connected drives
   - **CAREFULLY** select the lab SSD you want to reimage (typically 1TB)
   - Press **Enter**

:::danger
**CRITICAL:** Double-check you've selected the correct drive! Selecting the wrong drive will erase it permanently. The drive size should match the lab SSD (1TB).
:::

<!-- TODO: Add image showing target drive selection with warning -->

---

### Step 5: Execute Restoration

1. **Review and Confirm**
   - Clonezilla will show a summary of the operation
   - Review the source image and target drive carefully
   - Press **Enter** to continue

2. **Skip Disk Checking** (Optional)
   - When asked to check the image before restoration, select **-scr** (skip checking)
   - Press **Enter**

:::note
Skipping the check speeds up the process. Only check the image if you suspect corruption.
:::

3. **Final Confirmation**
   - Clonezilla will ask for final confirmation
   - Type **y** and press **Enter**
   - Type **y** again when prompted and press **Enter**

<!-- TODO: Add image of confirmation prompts -->

4. **Wait for Completion**
   - The restoration process will begin
   - Progress will be displayed on screen
   - **Do not interrupt** the process or power off the system

:::caution
The reimaging process typically takes 15-45 minutes depending on image size and drive speed. Do not disconnect drives or power off during this time.
:::

<!-- TODO: Add image of restoration in progress -->

---

### Step 6: Complete and Verify

1. **Restoration Complete**
   - When finished, Clonezilla will display a completion message
   - Press **Enter** to continue

2. **Power Down**
   - Select **poweroff** from the menu
   - Press **Enter**
   - Wait for the system to shut down completely

3. **Remove Drives**
   - Remove the Clonezilla USB drive
   - Disconnect the lab SSD from the SATA adapter

4. **Install in Lab Workstation**
   - Take the reimaged SSD to the target lab workstation
   - Install the drive in the workstation
   - Power on and verify Windows boots correctly

<!-- TODO: Add image of successful Windows boot screen -->

:::note
The first boot may take longer as Windows completes initial setup. This is normal.
:::

---

## Troubleshooting

### Clonezilla Won't Boot

- Verify the USB drive is properly inserted
- Check BIOS settings: ensure USB boot is enabled and prioritized
- Try a different USB port
- Verify the Clonezilla USB isn't corrupted (contact any Software FU member for replacement)

### Drive Not Detected

- Check all cable connections are secure
- Verify the SATA adapter is functioning
- Try a different USB port on for the SATA adapter

### Restoration Fails

- Verify you have enough space on the target drive (1TB required)
- Check for hardware issues with the target drive
- Verify the image files are not corrupted
- Try using the image check option before restoration

### Windows Won't Boot After Reimaging

- Verify the drive was fully restored (check completion message)
- Check BIOS boot order settings on the lab workstation
- Check SATA operation mode (Should be AHCI)
- Ensure the drive is properly connected in the workstation
- Try reimaging again if the issue persists

---

## Best Practices

1. **Before Starting:**
   - **VERIFY the computer is a Lab PC** - Never reimage personal or other non-lab computers
   - **Confirm reimaging is truly necessary** - Try all other solutions first
   - Document what troubleshooting steps were already attempted in Rounding form / Issue Master List
   - Verify you have the correct drive
   - Check that all necessary equipment is available
   - Allow sufficient time (1 hour recommended)

2. **During Reimaging:**
   - Never interrupt the process
   - Monitor progress to ensure no errors occur
   - Keep the area around the station clear

3. **After Completion:**
   - Return all equipment to its proper location
   - Test the workstation briefly before marking it as complete
   - Document any issues encountered

4. **Equipment Care:**
   - Handle drives carefully to avoid damage
   - Report any equipment damage or loss immediately to a Software FU member

---

## Additional Notes

:::note
This guide will be updated as new equipment (such as NVMe adapters) becomes available. Check back for updates on supported drive types and new image versions.
:::

### Image Update Schedule

Contact any Software FU member for information on the most current image versions.

### Getting Help

If you encounter issues not covered in this guide:
1. Consult with a Software FU member

---

## Appendix

### Equipment Checklist

- [ ] Clonezilla USB drive
- [ ] SATA adapter
- [ ] Lab SSD (1TB)
- [ ] Reimaging Station PC

### Estimated Times

| Task | Approximate Duration |
|------|---------------------|
| Setup and connection | 5-10 minutes |
| Booting Clonezilla | 2-3 minutes |
| Configuration | 3-5 minutes |
| Image restoration | 15-45 minutes |
| Verification | 5-10 minutes |
| **Total** | **30-75 minutes** |
