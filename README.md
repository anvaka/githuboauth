# githuboauth

Github oauth directive. Allows users of your website to authorize with GitHub.

# Why?

I started doing this to enable github on [graph drawing libraries](https://github.com/anvaka/graph-drawing-libraries) repository. Turns out complexity of "full client side" approach was too high. At the end I stopped using this repository. Instead I switched from to client-server architecture, where [Heroku app](https://github.com/anvaka/graph-drawing-stats) pulls all information from github and returns cached responses for [the frontend](http://anvaka.github.io/graph-drawing-libraries/#/all). 

Just keep in mind: there are better alternatives to GitHub authorization problem.

# usage

In your html code:

``` html
  <githuboauth clientId='b5926508f327fb8bd01b'
               oauthProxy='//ghoauth.herokuapp.com/authenticate/[code]'>
  </githuboauth>
```

See [demo](https://github.com/anvaka/githuboauth/tree/master/demo/basic) for 
end to end example.

Unfortunatly GitHub does not provide a way [to authenticate securily](https://developer.github.com/v3/oauth/#web-application-flow)
via client side only. This means the directive requires to have oauth proxy to
trade your app's [client secret](https://developer.github.com/v3/oauth/#github-redirects-back-to-your-site)
for an access token.

Fear not, seting up oauth proxy is pretty straigtforward. Please check instructions
for [anvaka/gatepicker](https://github.com/anvaka/gatekeeper).


# install

With [npm](https://npmjs.org) do:

```
npm install githuboauth
```

# license

MIT
