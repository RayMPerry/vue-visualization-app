<div id="table-of-contents">
<h2>Table of Contents</h2>
<div id="text-table-of-contents">
<ul>
<li><a href="#org30d220a">1. Introduction</a>
<ul>
<li><a href="#org6f0f594">1.1. Technologies</a></li>
<li><a href="#org3447466">1.2. Prerequisites</a></li>
<li><a href="#org61f28b0">1.3. Installation</a></li>
<li><a href="#org370c8fa">1.4. Verification</a></li>
</ul>
</li>
<li><a href="#orgb8db829">2. Usage</a>
<ul>
<li><a href="#org36c28d9">2.1. General Usage</a>
<ul>
<li><a href="#org467a63c">2.1.1. Schedule CSV Format</a></li>
<li><a href="#org88be2ad">2.1.2. Factoids/Fun Facts CSV Format</a></li>
</ul>
</li>
<li><a href="#org92e0bed">2.2. Technical Usage</a></li>
<li><a href="#orgcba66e6">2.3. Detailed Explanation</a></li>
</ul>
</li>
<li><a href="#org63999b1">3. Troubleshooting</a>
<ul>
<li><a href="#org02ab4af">3.1. Nothing is showing up for the schedule or the fun facts!</a>
<ul>
<li><a href="#orge5037a6">3.1.1. You uploaded a malformed CSV.</a></li>
<li><a href="#org8bb75cb">3.1.2. You uploaded the wrong CSV to the wrong component.</a></li>
<li><a href="#org8755b18">3.1.3. You uploaded a properly-formatted CSV too early.</a></li>
</ul>
</li>
<li><a href="#orgf712ece">3.2. Twitter isn't updating!</a></li>
</ul>
</li>
<li><a href="#orge9f8e10">4. Improvements</a>
<ul>
<li><a href="#org5c0cca9">4.1. Missteps and Compromises</a>
<ul>
<li><a href="#org57e06c5">4.1.1. Administrative endpoint is brutalistic at best</a></li>
<li><a href="#orge44d79b">4.1.2. No proper configuration file</a></li>
<li><a href="#org85f6e06">4.1.3. Environment variables and keys exposed to public</a></li>
<li><a href="#orgff00566">4.1.4. Files are not automatically renamed</a></li>
<li><a href="#org6427988">4.1.5. Magic numbers</a></li>
<li><a href="#org1ae6f88">4.1.6. Misnamed variables</a></li>
<li><a href="#orgcfdfd81">4.1.7. advanceDate()/advanceDay()/nextDay() does not advance application's date</a></li>
</ul>
</li>
<li><a href="#org708a0b8">4.2. Simple/Low</a>
<ul>
<li><a href="#org49347ed">4.2.1. Add style to the administrative endpoint.</a></li>
<li><a href="#orgb8e7ec6">4.2.2. Write to a single file per component.</a></li>
</ul>
</li>
<li><a href="#orgd21d706">4.3. Intermediate/Moderate</a>
<ul>
<li><a href="#org770423a">4.3.1. Extract variables and create configuration file.</a></li>
<li><a href="#orgbe04c94">4.3.2. Move magic numbers into configuration file.</a></li>
<li><a href="#org141f001">4.3.3. Rename the misleading variables and functions.</a></li>
</ul>
</li>
<li><a href="#orge80c917">4.4. Intricate/High</a>
<ul>
<li><a href="#orgf4e8030">4.4.1. Advance the application's date automatically.</a></li>
</ul>
</li>
</ul>
</li>
<li><a href="#org09e258a">5. Closing Notes</a></li>
</ul>
</div>
</div>


<a id="org30d220a"></a>

# Introduction

*HCP Schedule Wall* is meant to be displayed on large show monitors. While the majority of the application was made to be responsive, I can't guarantee the layout will be perfect on every device. It simply was not thoroughly tested and was played "fast and loose" across three weeks. It was originally called Media Center because it was supposed to be an generic holder for all types of web-based media. [More on that below](#org8ff1f8d).


<a id="org6f0f594"></a>

## Technologies

The front-end technologies used are:

-   [Vue-Router](https://router.vuejs.org/en/)
-   [Vuex](https://vuex.vuejs.org/en/)
-   [axios](https://github.com/axios/axios)
-   [Vue](https://vuejs.org/v2/api/)
-   [TypeScript (tsconfig.json)](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html) <sup><a id="fnr.1" class="footref" href="#fn.1">1</a></sup>
-   [Webpack](https://webpack.js.org/)
-   [Yarn](https://yarnpkg.com/en/)

The back-end technologies used are:

-   [Node.js](https://nodejs.org/en/)
-   [socket.io](https://socket.io/)
-   [twit](https://github.com/ttezel/twit)
-   [Papa Parse](http://papaparse.com/)
-   [Moment.js](https://momentjs.com/)


<a id="org3447466"></a>

## Prerequisites

As of this writing, *HCP Schedule Wall* was built on Node 8.5.0 and whichever NPM comes with that. It's *strongly recommended* that you use some type of Node version manager for this. [nvm](https://github.com/creationix/nvm) is a solid choice for this. 

*HCP Schedule Wall* also requires a redirect using `iptables`. Run the following command:

    iptables -t nat -A PREROUTING -i eth0 -p tcp --dport 80 -j REDIRECT --to-port 6464

**Explanation:**
`-t nat` is declaring the table to affect.
`-A PREROUTING` is declaring the rule to append to.
`-i eth0` is declaring the interface.
`-p tcp` is declaring the protocol.
`--dport 80` is declaring the destination port.
`-j REDIRECT` is declaring the type of jump to occur when a packet matches the rule.
`--to-port 6464` is declaring the source port.


<a id="org61f28b0"></a>

## Installation

If you don't have Yarn installed,

    npm install -g yarn

Optionally, you can use a process manager like [PM2](http://pm2.keymetrics.io/) to handle signals and automatic rebooting,

    npm install -g pm2

If you have Yarn installed,

    git clone "<<the main repo>>"
    cd "<<the repo directory>>"
    yarn install
    YEAR=<<the current year>> node server.js


<a id="org370c8fa"></a>

## Verification

Once all of these commands have been run without error, accessing the EC2 instance from its public DNS address should show the main view.


<a id="orgb8db829"></a>

# Usage


<a id="org36c28d9"></a>

## General Usage

For non-technical users, there aren't many inputs for you. This is one of those "set it and forget it" projects. For best results, you'll want to keep one tab on the site and another tab for the administrative endpoint (located at /admin). The administrative endpoint has exactly two upload inputs. They accept CSVs in the following formats:<a id="org48dadf2"></a>


<a id="org467a63c"></a>

### Schedule CSV Format

If you are trying to upload a schedule:

-   24-hour times, please. The application will handle the string conversion.
-   No emojis, no greek letters, no em-dashes.

    [Date] - (MM/DD/YYYY) - Day of the event.
    [Start Time] - (HH:MM) - Time the event starts.
    [End Time] - (HH:MM) - Time the event ends.
    [Details] - (Freeform) - Headline for the event.
    [Presenter] - (Freeform) - Name of the presenter.
    [Presenter Company] - (Freeform) - Name of the company the presenter represents.
    [Location] - (Freeform) - Name of the event location.

    Date,Start Time,End Time,Details,Presenter,Presenter Company,Location
    09/25/2017,10:00,10:30,Serialization for late starters: inc. industry research results and global implementation case study ,Carlos Machado,SEA Vision,Innovation Stage | N-601 Healthcare Packaging EXPO
    09/25/2017,11:00,11:30,When Traceability Meets Industry 4.0 -  Supply Chain Visibility for Ultimate Empowerment ,Yanik Beaulieu,OPTEL Group,Innovation Stage | N-601 Healthcare Packaging EXPO


<a id="org88be2ad"></a>

### Factoids/Fun Facts CSV Format

If you're trying to upload fun facts and factoids:

    [Description] – (Freeform) – The fact itself.

    Description
    10% of pre-registered attendees are in the life sciences
    35% of pre-registered attendees are new to PACK EXPO/Healthcare Packaging EXPO

As an aside, please ensure that you are uploading the proper file to the proper place. The application will *unapologetically* fail and it will not display anything for the component you were trying to update. 


<a id="org92e0bed"></a>

## Technical Usage

For developers, there's a lot of piecemeal happening under the hood as a result of my frantic rush to finish this. (Sorry.) Even though I said it was optional before, I'm suggesting that you download [PM2](http://pm2.keymetrics.io/). There is a cron job that needs to be added and PM2 makes it easier. The cron job is:

    0 0 * * * pm2 restart server

To clarify, this cron job restarts the server every night at midnight. Why? I named too many functions advanceDate/advanceDay/nextDay and none of them *actually* advance the date of the application. By restarting, the server will set the date to the current day and build its stores up from there.


<a id="orgcba66e6"></a>

## Detailed Explanation


<a id="org63999b1"></a>

# Troubleshooting


<a id="org02ab4af"></a>

## Nothing is showing up for the schedule or the fun facts!

This can happen for a combination of reasons. It could be:


<a id="orge5037a6"></a>

### You uploaded a malformed CSV.

**The fix:** Please ensure that you followed the correct format [as seen above](#org48dadf2).


<a id="org8bb75cb"></a>

### You uploaded the wrong CSV to the wrong component.

**The fix:** Please ensure that you are uploading the correct CSV to the correct upload input. There is no flexibility for formats in this application.


<a id="org8755b18"></a>

### You uploaded a properly-formatted CSV too early.

This is an easy "gotcha". Currently, the application only understands the convention as a three-day event. As a result, the header (technically, the footer) displays "Today", "Tomorrow", or the day of the week two days in the future. If the application doesn't recognize your event's date or your event's date is more that two days in the future, it will not appear. **The fix:** You actually don't have to do anything if the dates are [properly formatted](#org258a611). You can just let the application run and it will automatically update. If the dates aren't properly formatted, please correct them and re-upload your CSV.


<a id="orgf712ece"></a>

## Twitter isn't updating!

This is more than likely due to the application hitting the API request limit. IIRC, it's something to the tune of `15 API requests per 15 minutes`. Give the application a moment to catch up.


<a id="orge9f8e10"></a>

# Improvements<a id="org8ff1f8d"></a><sup><a id="fnr.2" class="footref" href="#fn.2">2</a></sup>

The original intent for this application was to be a generic media center for all types of web-based content but I simply didn't have the time to think about proper architecture. There are a few variables in the code that hint at that. I've listed some of the shortcomings of the application below. Feel free to take them into consideration when refactoring this.


<a id="org5c0cca9"></a>

## Missteps and Compromises


<a id="org57e06c5"></a>

### Administrative endpoint is brutalistic at best

This was completely my fault. I underestimated the time it took to upload a file from the web browser and a deadline snuck up on me. Plain and simple.


<a id="orge44d79b"></a>

### No proper configuration file

All of the dates and magic numbers should really be in a config file. I think I had plans for that in the very beginning but - like most rushed projects - code quality suffers in an effort to get the product out the door.


<a id="org85f6e06"></a>

### Environment variables and keys exposed to public

**YEAH.** Sorry about that; they're even in the repo (even though it's a private repo). At some point, you should regenerate those keys, put them in a `.env` file, and read from that. Just remember to add that file to the `.gitignore`.


<a id="orgff00566"></a>

### Files are not automatically renamed

I'm actually not sure; I've never checked this. I think the current functionality creates new `scheduleXXXX.csv` and `newsfeedXXXX.csv` per year if they don't exist and overwrite them if they do.


<a id="org6427988"></a>

### Magic numbers

They are everywhere. Move them to the configuration file if you make one.


<a id="org1ae6f88"></a>

### Misnamed variables

There are a lot of misnamed variables surrounding the date(s). At some point, you should make distinct names for each one. Just ensure you understand what it's being used for.


<a id="orgcfdfd81"></a>

### advanceDate()/advanceDay()/nextDay() does not advance application's date

IIRC, these functions change specific variables related to the date but not the date the application needs to recalculate the longform days ("Today", "Tomorrow", <DAY OF THE WEEK>). As a result, the server is [restarted every night at midnight](#org2b14b44) to recalculate those days.


<a id="org708a0b8"></a>

## Simple/Low


<a id="org49347ed"></a>

### Add style to the administrative endpoint.

They're single-file components. Shouldn't be hard to design something better than two input boxes.


<a id="orgb8e7ec6"></a>

### Write to a single file per component.

This is pretty optional. Thinking on it a bit, I'm pretty sure you don't want to overwrite only one file.


<a id="orgd21d706"></a>

## Intermediate/Moderate


<a id="org770423a"></a>

### Extract variables and create configuration file.

This isn't hard as much as it is tedious. Perservere.


<a id="orgbe04c94"></a>

### Move magic numbers into configuration file.


<a id="org141f001"></a>

### Rename the misleading variables and functions.


<a id="orge80c917"></a>

## Intricate/High


<a id="orgf4e8030"></a>

### Advance the application's date automatically.

Again, there are a lot of bad decisions in this code. If you decide to tackle this, make sure you understand how the dates work and are calculated. It's so easy to get lost in there, even if you do understand the code in a vacuum.


<a id="org09e258a"></a>

# Closing Notes

There were a lot of missteps and shifting sands. However, when it came time to show it off, it worked flawlessly. Remember when you're working on this: the small victories are still victories. Good luck and godspeed.


# Footnotes

<sup><a id="fn.1" href="#fnr.1">1</a></sup> Technically, only `ts-loader` is used, which is a Webpack loader that lets us use TypeScript syntax in the code.

<sup><a id="fn.2" href="#fnr.2">2</a></sup> Based on general complexity (assuming mid-level developer experience). This is a subjective measure and should be taken with a grain of salt.
