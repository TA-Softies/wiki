---
title: Installing Windows 11 on Apple Silicon via UTM
description: Guide to install Windows 11 on macOS with Apple Silicon chips using UTM.
---

:::caution[Work in progress]
This guide is still being developed and is not yet complete.
:::

This guide is meant to be a continuation for the [Installation guideline for UTM (macOS - M Series)](https://apiit.atlassian.net/wiki/spaces/ITSM/pages/2540175384/Installation+guideline+for+UTM+macOS+-+M+series).

## Download Windows 11 ISO

### Download CrystalFetch

As stated on the [UTM Guide for Windows 11](https://docs.getutm.app/guides/windows/):

:::note
The easiest way to obtain a Windows installer ISO is with CrystalFetch on macOS, a free utility for legally obtaining the newest Windows builds from Microsoft.
:::

**CrystalFetch** is a MacOS app that you can use to download Windows Installer ISOs.

**Step 1**: Open the [link](https://github.com/TuringSoftware/CrystalFetch/releases/latest/download/CrystalFetch.dmg) to download CrystalFetch.

**Result**: CrystalFetch will be Downloaded.

![CrystalFetch download](../../../assets/images/utm/1.png)

### Install CrystalFetch

**Step 1**: Double click on the **CrystalFetch.dmg**.

![CrystalFetch DMG file](../../../assets/images/utm/2.png)

**Step 2**: **Right click and Copy** the **CrystalFetch** App.

![Copy CrystalFetch app](../../../assets/images/utm/3.png)

**Step 3**: Open the **Applications** folder from the Side menu.

![Access Applications folder](../../../assets/images/utm/4.png)

**Step 4**: Paste in to the Folder

![Paste CrystalFetch to Applications](../../../assets/images/utm/5.png)

**Result**: **CrystalFetch** has been installed successfully.

![CrystalFetch installation complete](../../../assets/images/utm/6.png)

### Use CrystalFetch to download the ISO

**Step 1**: Run the **CrystalFetch** app from Launchpad.

**Step 1.1**: Open Launchpad by clicking the following icon from the Dock.

![Launchpad icon in Dock](../../../assets/images/utm/7.png)

**Step 1.2**: Click on the CrystalFetch Icon to open it.

![CrystalFetch icon in Launchpad](../../../assets/images/utm/8.png)

**Step 1.3**: Click **Open**

![CrystalFetch security dialog](../../../assets/images/utm/9.png)

**Step 2**: Set the Proper settings and click **Download**.

:::caution
**Version**: Windows 11
**Build**: Latest
**Architecture**: Apple Silicon
**Language**: *Your preferred language (For this guide we used "English (United States)")*
**Edition**: Windows 11
:::

![Set the proper config](../../../assets/images/utm/10.png)

**Step 3**: Click **Accept** and wait for it to finish downloading.

![Accept Microsoft terms](../../../assets/images/utm/11.png)
![Download progress](../../../assets/images/utm/12.png)

**Step 4**: Save the downloaded ISO file your desired folder.

![Save ISO file dialog](../../../assets/images/utm/13.png)

## Set up the Virtual Machine

Now that you have downloaded the ISO file, we will go ahead and Set up and Boot up the Virtual machine.

**Step 1**: Run UTM app if not already open.

**Step 1.1**: Open Launchpad by clicking the following icon from the Dock.

![Launchpad icon in Dock](../../../assets/images/utm/7.png)

**Step 1.2**: Click on the UTM Icon to open it.

![UTM icon in Launchpad](../../../assets/images/utm/14.png)

**Step 2**: Press the + icon to create a new Virtual Machine

![UTM create new VM](../../../assets/images/utm/15.png)

**Step 3**: Click on Virtualize

![UTM virtualize option](../../../assets/images/utm/16.png)

**Step 4**: Click on Windows

![UTM Windows option](../../../assets/images/utm/17.png)

**Step 5**: Import the Boot ISO Image that you have downloaded earlier

![UTM import ISO](../../../assets/images/utm/18.png)

## Install Windows

:::note
This section is under construction and will be updated soon.
:::

## Set up Windows

:::note
This section is under construction and will be updated soon.
:::
