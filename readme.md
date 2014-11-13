![The Salmon of Correction](http://upload.wikimedia.org/wikipedia/commons/2/26/Plonk.png)

Plonkify
========

A Chrome extension that <a href="http://en.wikipedia.org/wiki/Plonk_%28Usenet%29">plonks</a> Twitter accounts.

#### How do I install Plonkify?

- Open up Chrome's extension page by typing `chrome://extensions` into your URL bar.

- Be sure the checkbox next to "Developer mode" is checked! (thanks, @soypunk!)

- Use the Download ZIP button on this page to get the archive.

- Unzip this archive. You should have one folder, probably named `plonkify-master`.

- Drag the folder into the extensions page until you see the Drop to Install note.

- Drop it.

#### How can I tell if it's working?

Try searching on Twitter for "gamergate" and you should see some plonked accounts:  

https://twitter.com/search?q=%23gamergate

The default list is very short, and is based on <a href="https://github.com/freebsdgirl">@freebsdgirl</a>'s initial Twitter block list.

#### How do I add more accounts to my plonk list?

- Find a tweet from an account you want to plonk.

- Right-click the profile image and choose Plonkify from the context menu.

- When the JavaScript confirm box appears, click OK.

- Observe that the entire tweet and all other tweets from that account have been covered by a solid salmon-colored box.

#### Ack! Splutter! Undo! Undo!

Relax. None of this happens on Twitter's back end, and it's limited to your personal list, so nobody will ever be able to tell you're using it. If you get into serious trouble, just disable the extension.

- To de-plonkify an account, find the profile image by mousing over the blocked part, right-click, and choose Plonkify from the context menu.

- When the JavaScript confirm box appears, asking if you want to de-plonkify, click OK.

#### How can I tell who's on my list?

In `chrome://extensions` click the link under Plonkify that says Options. Here you will be able to see a list of account numbers. This is super-crude, does not show account names, and isn't editable; if there's interest, I will fix this up.

#### How can I use a completely different list?

Again in Options, change the Plonk List URL to the address of your choice. Right now it's pointing at the current raw state of a gist I maintain, here:

https://gist.githubusercontent.com/kentbrew/0fc8cb6c961ab9cdb7a3/raw/

#### Okay, so I should be able to copy and paste from my settings list into a new gist and share the URL?

That would be one way to do it, yes. Be careful to stop copying right after `raw/`, so you get the current version.

#### If I make my own list, do I need to worry about account names?

Nope. Plonkify reads your list file one line at a time and uses the string before the first space as the account number. Again, if there's interest, I will do more work on this.  Or you could fork it and do it yourself!

#### Why should I run this instead of just blocking on Twitter?

If you have a public account on Twitter, a theoretically infinite number of miscreants can jump right into your timeline with hobnailed boots and you can never, ever make them go away without taking your account private.

Twitter offers no real way to manage blocked accounts. I've tried TwitBlock and a few others, and they are slow, broken, or both. And once you get up over 1500, there seems to be no available way to even list them out via the Twitter API.

I suspect that this is not an attractive problem for Twitter to solve. There aren't enough users who might want to power-block a bunch of accounts, those API queries are expensive, and there's just got too much else going on in the make-some-money department.

Keep an eye on this repo:

https://github.com/freebsdgirl/ggautoblocker

... for updates on the state of the art. Some really smart people are working on this problem and (more importantly) bringing it to the attention of Twitter's proprietors.
