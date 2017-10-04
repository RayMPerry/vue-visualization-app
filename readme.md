<div id="table-of-contents">
<h2>Table of Contents</h2>
<div id="text-table-of-contents">
<ul>
<li><a href="#org441fb34">1. Introduction</a>
<ul>
<li><a href="#orgdc6c46f">1.1. Technologies</a></li>
<li><a href="#org70b9a56">1.2. Prerequisites</a></li>
<li><a href="#org6dc1b67">1.3. Installation</a></li>
<li><a href="#org057cd68">1.4. Verification</a></li>
</ul>
</li>
<li><a href="#orgd21ef7d">2. Usage</a>
<ul>
<li><a href="#orgb000bf5">2.1. General Usage</a>
<ul>
<li><a href="#org1f7a481">2.1.1. Schedule CSV Format</a></li>
<li><a href="#orgf221fe5">2.1.2. Factoids/Fun Facts CSV Format</a></li>
</ul>
</li>
<li><a href="#orgdf015bb">2.2. Technical Usage</a></li>
<li><a href="#org8c6d5be">2.3. Detailed Explanation</a></li>
</ul>
</li>
<li><a href="#org2655ed3">3. Troubleshooting</a>
<ul>
<li><a href="#org3f76823">3.1. Nothing is showing up for the schedule or the fun facts!</a>
<ul>
<li><a href="#orgd9e37fa">3.1.1. You uploaded a malformed CSV.</a></li>
<li><a href="#orga2cd409">3.1.2. You uploaded the wrong CSV to the wrong component.</a></li>
<li><a href="#orgd664a9a">3.1.3. You uploaded a properly-formatted CSV too early.</a></li>
</ul>
</li>
<li><a href="#org934936e">3.2. Twitter isn't updating!</a></li>
</ul>
</li>
<li><a href="#org8367454">4. Improvements</a>
<ul>
<li><a href="#orgf2667ed">4.1. Missteps and Compromises</a>
<ul>
<li><a href="#orgc8b3a52">4.1.1. Administrative endpoint is brutalistic at best</a></li>
<li><a href="#orgee17816">4.1.2. No proper configuration file</a></li>
<li><a href="#orgbf1d5f3">4.1.3. Environment variables and keys exposed to public</a></li>
<li><a href="#orgb12fea8">4.1.4. Files are not automatically renamed</a></li>
<li><a href="#orgd95593d">4.1.5. Magic numbers</a></li>
<li><a href="#org69d9386">4.1.6. Misnamed variables</a></li>
<li><a href="#org87da6c7">4.1.7. advanceDate()/advanceDay()/nextDay() does not advance application's date</a></li>
</ul>
</li>
<li><a href="#orgcee2688">4.2. Simple/Low</a>
<ul>
<li><a href="#org69d7187">4.2.1. Add style to the administrative endpoint.</a></li>
<li><a href="#org601e54a">4.2.2. Write to a single file per component.</a></li>
</ul>
</li>
<li><a href="#org45ed8a9">4.3. Intermediate/Moderate</a>
<ul>
<li><a href="#org230992c">4.3.1. Extract variables and create configuration file.</a></li>
<li><a href="#org8c16991">4.3.2. Move magic numbers into configuration file.</a></li>
<li><a href="#orgff981fa">4.3.3. Rename the misleading variables and functions.</a></li>
</ul>
</li>
<li><a href="#org4d97c14">4.4. Intricate/High</a>
<ul>
<li><a href="#org14a072b">4.4.1. Advance the application's date automatically.</a></li>
</ul>
</li>
</ul>
</li>
<li><a href="#orge8992ef">5. Closing Notes</a></li>
</ul>
</div>
</div>


<a id="org441fb34"></a>

# Introduction

*HCP Schedule Wall* is meant to be displayed on large show monitors. While the majority of the application was made to be responsive, I can't guarantee the layout will be perfect on every device. It simply was not thoroughly tested and was played "fast and loose" across three weeks. It was originally called Media Center because it was supposed to be an generic holder for all types of web-based media. [More on that below](#org514e3d1).


<a id="orgdc6c46f"></a>

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


<a id="org70b9a56"></a>

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


<a id="org6dc1b67"></a>

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


<a id="org057cd68"></a>

## Verification

Once all of these commands have been run without error, accessing the EC2 instance from its public DNS address should show the main view.


<a id="orgd21ef7d"></a>

# Usage


<a id="orgb000bf5"></a>

## General Usage

For non-technical users, there aren't many inputs for you. This is one of those "set it and forget it" projects. For best results, you'll want to keep one tab on the site and another tab for the administrative endpoint (located at /admin). The administrative endpoint has exactly two upload inputs. They accept CSVs in the following formats:<a id="org9f7c932"></a>


<a id="org1f7a481"></a>

### Schedule CSV Format

If you are trying to upload a schedule:

    - 24-hour times, please. The application will handle the string conversion.
    
    - No emojis, no greek letters, no em-dashes.
    
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


<a id="orgf221fe5"></a>

### Factoids/Fun Facts CSV Format

If you're trying to upload fun facts and factoids:

    [Description] – (Freeform) – The fact itself.

    Description
    
    10% of pre-registered attendees are in the life sciences
    
    35% of pre-registered attendees are new to PACK EXPO/Healthcare Packaging EXPO

As an aside, please ensure that you are uploading the proper file to the proper place. The application will *unapologetically* fail and it will not display anything for the component you were trying to update. 


<a id="orgdf015bb"></a>

## Technical Usage

For developers, there's a lot of piecemeal happening under the hood as a result of my frantic rush to finish this. (Sorry.) Even though I said it was optional before, I'm suggesting that you download [PM2](http://pm2.keymetrics.io/). There is a cron job that needs to be added and PM2 makes it easier. The cron job is:

    0 0 * * * pm2 restart server

To clarify, this cron job restarts the server every night at midnight. Why? I named too many functions advanceDate/advanceDay/nextDay and none of them *actually* advance the date of the application. By restarting, the server will set the date to the current day and build its stores up from there.


<a id="org8c6d5be"></a>

## Detailed Explanation


<a id="org2655ed3"></a>

# Troubleshooting


<a id="org3f76823"></a>

## Nothing is showing up for the schedule or the fun facts!

This can happen for a combination of reasons. It could be:


<a id="orgd9e37fa"></a>

### You uploaded a malformed CSV.

**The fix:** Please ensure that you followed the correct format [as seen above](#org9f7c932).


<a id="orga2cd409"></a>

### You uploaded the wrong CSV to the wrong component.

**The fix:** Please ensure that you are uploading the correct CSV to the correct upload input. There is no flexibility for formats in this application.


<a id="orgd664a9a"></a>

### You uploaded a properly-formatted CSV too early.

This is an easy "gotcha". Currently, the application only understands the convention as a three-day event. As a result, the header (technically, the footer) displays "Today", "Tomorrow", or the day of the week two days in the future. If the application doesn't recognize your event's date or your event's date is more that two days in the future, it will not appear. **The fix:** You actually don't have to do anything if the dates are [properly formatted](#orgb1cdb9b). You can just let the application run and it will automatically update. If the dates aren't properly formatted, please correct them and re-upload your CSV.


<a id="org934936e"></a>

## Twitter isn't updating!

This is more than likely due to the application hitting the API request limit. IIRC, it's something to the tune of `15 API requests per 15 minutes`. Give the application a moment to catch up.


<a id="org8367454"></a>

# Improvements<a id="org514e3d1"></a><sup><a id="fnr.2" class="footref" href="#fn.2">2</a></sup>

The original intent for this application was to be a generic media center for all types of web-based content but I simply didn't have the time to think about proper architecture. There are a few variables in the code that hint at that. I've listed some of the shortcomings of the application below. Feel free to take them into consideration when refactoring this.


<a id="orgf2667ed"></a>

## Missteps and Compromises


<a id="orgc8b3a52"></a>

### Administrative endpoint is brutalistic at best

This was completely my fault. I underestimated the time it took to upload a file from the web browser and a deadline snuck up on me. Plain and simple.


<a id="orgee17816"></a>

### No proper configuration file

All of the dates and magic numbers should really be in a config file. I think I had plans for that in the very beginning but - like most rushed projects - code quality suffers in an effort to get the product out the door.


<a id="orgbf1d5f3"></a>

### Environment variables and keys exposed to public

**YEAH.** Sorry about that; they're even in the repo (even though it's a private repo). At some point, you should regenerate those keys, put them in a `.env` file, and read from that. Just remember to add that file to the `.gitignore`.


<a id="orgb12fea8"></a>

### Files are not automatically renamed

I'm actually not sure; I've never checked this. I think the current functionality creates new `scheduleXXXX.csv` and `newsfeedXXXX.csv` per year if they don't exist and overwrite them if they do.


<a id="orgd95593d"></a>

### Magic numbers

They are everywhere. Move them to the configuration file if you make one.


<a id="org69d9386"></a>

### Misnamed variables

There are a lot of misnamed variables surrounding the date(s). At some point, you should make distinct names for each one. Just ensure you understand what it's being used for.


<a id="org87da6c7"></a>

### advanceDate()/advanceDay()/nextDay() does not advance application's date

IIRC, these functions change specific variables related to the date but not the date the application needs to recalculate the longform days ("Today", "Tomorrow", <DAY OF THE WEEK>). As a result, the server is [restarted every night at midnight](#orgccaed9e) to recalculate those days.


<a id="orgcee2688"></a>

## Simple/Low


<a id="org69d7187"></a>

### Add style to the administrative endpoint.

They're single-file components. Shouldn't be hard to design something better than two input boxes.


<a id="org601e54a"></a>

### Write to a single file per component.

This is pretty optional. Thinking on it a bit, I'm pretty sure you don't want to overwrite only one file.


<a id="org45ed8a9"></a>

## Intermediate/Moderate


<a id="org230992c"></a>

### Extract variables and create configuration file.

This isn't hard as much as it is tedious. Perservere.


<a id="org8c16991"></a>

### Move magic numbers into configuration file.


<a id="orgff981fa"></a>

### Rename the misleading variables and functions.


<a id="org4d97c14"></a>

## Intricate/High


<a id="org14a072b"></a>

### Advance the application's date automatically.

Again, there are a lot of bad decisions in this code. If you decide to tackle this, make sure you understand how the dates work and are calculated. It's so easy to get lost in there, even if you do understand the code in a vacuum.


<a id="orge8992ef"></a>

# Closing Notes

There were a lot of missteps and shifting sands. However, when it came time to show it off, it worked flawlessly. Remember when you're working on this: the small victories are still victories. Good luck and godspeed.


# Footnotes

<sup><a id="fn.1" href="#fnr.1">1</a></sup> Technically, only `ts-loader` is used, which is a Webpack loader that lets us use TypeScript syntax in the code.

<sup><a id="fn.2" href="#fnr.2">2</a></sup> Based on general complexity (assuming mid-level developer experience). This is a subjective measure and should be taken with a grain of salt.
