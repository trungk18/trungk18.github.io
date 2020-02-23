---
title: "Angular - How I build a small reusable search validation module"
categories: experience
tags: angular
---

In Zyllem, we built software with flexibly and customization in mind. There are many areas in the platform was built purely for configuration only. Recently, I have to build a small search validation module, which will be gradually adapt to the other parts of the platform where we have the search.

We allow customer to configure many custom property with different type. Many customer they have their own identify number, such as invoice number. They can define it with an ID custom property in Zyllem platform. And then from there, they can select this ID to be display everywhere, instead of the default Zyllem quick reference ID. User normally will scan a list of invoice number, or copy and paste from an excel file to Zyllem to search for them. But many times, they did a mistake, and for the search result, of course we will only return back the result corresponding to the valid ID. We want to tell the customer about these mistake. And that's how the search validation was born.

There feature looks like:

- As a user i can filter the list of records based on Ids that i can add manually using a bar-code scanner or copy from other file or add manually.
- The user can click on a filter link that will open a popup window
- The user can then add ids that he would like filter. He can add the ids by typing them, copy them from external source or use the bar-code scanner. Each Id need to be separated by new line.
- When the user stop editing the text area for 1 second the system will then scan and process the manual input.
- For each id, the system will try and fetch the segment from the server and will display if this id is found or not
- The user can then see the validity of his id's
- The user can then click Ok to use the filter and the page will filter only those ids
- Please note that the Id could be the Zyllem DB Id or the custom property type Id that the user has defined in the connector configuration.

