# TEA Network — RWA SBT Demo

## Overview

This project demonstrates a **Real World Asset (RWA)** onboarding and access model using **Soulbound Tokens (SBTs)** on Polygon Amoy.

Each SBT represents a **non-transferable participation right** in a real-world asset, service, or investment structure.  
The demo shows how investors or members can:

- View available RWA opportunities  
- Preview legal and commercial terms  
- Accept investor policies  
- Claim an SBT representing participation  

The Admin panel allows creation of new RWA SBT types directly on-chain using JSON metadata hosted in this repository.

This repository is a **reference architecture prototype** for future compliant RWA issuance platforms.

---

## Concept

### What is an RWA SBT?

An RWA SBT is a **non-transferable on-chain certificate** representing a right connected to a real-world asset or service.

Depending on the business model, an RWA SBT may represent:

### Security-like participation

- Revenue sharing rights  
- Profit participation  
- Equity-like exposure  

These are typically classified as **security tokens** in real regulatory environments.

### Utility participation

- Access to consulting services  
- Membership in professional networks  
- Event or deal access  

These are typically classified as **utility tokens**.

This demo supports both models through metadata configuration.

---

## SPV Structure (Special Purpose Vehicle)

In real deployments, each asset or deal is typically wrapped in a **Special Purpose Vehicle (SPV)**.

The SPV:

- Holds the real-world asset  
- Defines investor or member rights  
- Distributes revenues or services  
- Issues corresponding SBTs  

The SBT acts as:

> **Digital proof of participation in the SPV.**

In production systems, SPV governance, reporting, and distributions would be handled off-chain, while ownership proof and access rights remain on-chain.

---

## Investor Policy Acceptance

Before claiming an SBT, users must:

- Preview deal or service terms  
- Review metadata-defined rights  
- Accept investor policy  
- Confirm understanding of risk  

This simulates real-world compliance onboarding flows.

---

## Bilateral vs Pool Participation Models

### Bilateral Model

- One SBT = participation in one specific asset or deal  
- Direct relationship between investor and SPV  

**Example:**  
`Dinner Circle Copenhagen — Share #1`

---

### Pool Model

- One SBT = participation in a diversified asset pool  
- Multiple assets under one SPV  

**Example:**  
`Nordic Hospitality Revenue Pool`

Both models are implemented by selecting different JSON metadata templates.

---

## Technical Architecture

### Smart Contract

- ERC-5192 style Soulbound Tokens  
- Type-based minting (SBT Types)  
- On-chain stored metadata URI  
- Non-transferable ownership  
- Burn capability for revocation  

