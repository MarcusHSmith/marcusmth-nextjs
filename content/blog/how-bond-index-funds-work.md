---
path: blog
date: "2026-09-16T09:00:00.000Z"
lastUpdated: "2026-09-16T09:00:00.000Z"
title: How Bond Index Funds Actually Work
description: What a bond index fund like BND really does with your money — where the monthly distribution comes from, why the NAV drops when it pays, and why no bond index fund can just skip the distributions.
tags: ["investing", "bonds", "personal-finance"]
isPublished: true
---

I spent a week trying to answer a simple question: if I buy a bond index fund like BND, where does the monthly payout actually come from — and is there any version of this that just doesn't distribute? Here's the mechanics, as I now understand them.

This isn't advice. It's the machinery.

## What BND actually holds

BND — Vanguard's Total Bond Market ETF — tracks the Bloomberg U.S. Aggregate Float Adjusted Index and holds roughly 11,500 US investment-grade bonds (11,476 as of mid-2026, per Vanguard): Treasuries, agency mortgage-backed and asset-backed securities, corporate bonds. When you buy a share, you own a slice of that bond portfolio. The fund's job is to track the index, not to make decisions.

Those bonds pay interest (coupons) on their own schedules. The fund collects all of it.

## Where the monthly distribution comes from

The fund pools every coupon payment it receives, subtracts its tiny expense ratio, and pays the rest out to shareholders — usually monthly. As of September 2026, that's worked out to roughly $0.25 per share per month, around a 4% yield at recent prices.

This is the part people get wrong: **the distribution isn't profit the fund "decided" to pay you.** The tax code only lets a fund skip corporate-level tax if it passes through at least 90% of its investment income to shareholders — so in practice, funds pass through essentially all of it. If BND hoarded the interest instead, it would be taxed on it like any corporation. Distributing it is how the fund stays tax-efficient as a vehicle.

## Why the NAV drops on the ex-dividend date

Every month, watch the share price on the ex-dividend date — not the day the cash actually arrives. On the ex-dividend date, the NAV drops by almost exactly the distribution amount, because that's the morning the fund's books stop counting the distribution as part of the fund. The cash itself lands in your account (or gets reinvested) a few days later, on the payment date.

That's not a loss — it's conservation of value. Buy the share before the ex-dividend date and you get the distribution; buy on or after it and you don't, but you paid a lower price. Your total position — shares plus cash — is unchanged either way.

If you reinvest distributions automatically, your share count ticks up and the whole thing compounds quietly. If you don't, you get the monthly cash flow and a share price that stair-steps down a little each month. Same economics, different shape.

## Can any bond index fund just... not distribute?

This was my actual question, and the answer is basically no — not among US bond index funds. The pass-through requirement applies to the structure, not the brand. Any fund holding coupon-paying bonds has income it must push out to shareholders.

The closest exception I found turned out not to be one: **zero-coupon bond ETFs like ZROZ** (long-term Treasury zeros). Zero-coupon bonds pay no periodic interest — they accrete toward face value instead — so I assumed there'd be nothing to distribute. Wrong. The IRS treats that accretion as interest income as it accrues, and the pass-through rule applies to the fund just the same — so ZROZ pays it out as quarterly distributions (about $3.25 per share over 2026, roughly a 5.5% yield). You don't escape the distribution; you just get it out of discount bonds instead of coupons.

And the "phantom income" idea flips on its head. Phantom income — owing tax on interest you never received in cash — is what happens when you hold zero-coupon bonds *directly*. Through an ETF, the phantom becomes real: the fund converts the accreted discount into an actual cash distribution, and the tax bill comes with it. ZROZ doesn't dodge the machine; it proves the machine is structural.

## What this means for where you hold bonds

In a tax-advantaged account (401k, IRA), none of this matters much — distributions just compound inside the wrapper. In a taxable account, the monthly distributions are taxable income in the year they're paid, which is why people in high tax brackets start looking at municipal bond funds: the yields are lower, but the interest is federal tax-exempt — and state tax-exempt too, usually only for your own state's bonds.

That's the whole machine: bonds pay coupons, the fund collects them, the law makes the fund hand them to you, the NAV dips, and the tax treatment depends on the account. Once you see it, bond fund behavior stops being mysterious — it's just plumbing.
