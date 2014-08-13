# ezInfiniteScroll

A module for [AngularJS](http://angularjs.org/) that enables you to bind an
callback to be triggered when an element has been scrolled almost to its
bottom. Primary use case is infinite scrolling.

Forked from [lrInfiniteScroll](http://lorenzofox3.github.io/lrInfiniteScroll)
with gratitude. This fork supports a child directive that will cause the
callback to be invoked when the child element's size has changed.
As an example, you can auto-populate a list when there is visible space within
the parent.

## Attach an event handler

Set the attribute value to a parent scope property that provides the callback.
That property value must itself have a property called 'callback'


```html
<ul ez-infinite-scroll="callbackHolder">
    <li ng-repeat="item in myCollection">
</ul>
```

## Change the scroll threshold

By default the handler will be called when the user is scrolling *down* and
only *50* pixels are remaining before reaching the end of the element. You can
 overwrite the 50px by setting the attribute *scroll-threshold*

```html
<ul ez-infinite-scroll="myCallbackHolder" scroll-threshold="200">
    <li ng-repeat="item in myCollection">
</ul>
```
## Change the time threshold

To reduce the amount of $digest loop, instead of calling the handler whenever
a scroll down event is detected in the end zone. A time is started and if
no other event is detected within 400ms, then the handler is called. You can
overwrite the time value by setting the *time-threshold* attribute.

```html
<ul ez-infinite-scroll="myEventHandler" scroll-threshold="200" time-threshold="600">
    <li ng-repeat="item in myCollection">
</ul>
```

## License

ezInfinite scroll module is released under the MIT License:

> Copyright (C) 2014 Mike Chaberski.
> Copyright (C) 2013 Laurent Renard.
>
> Permission is hereby granted, free of charge, to any person
> obtaining a copy of this software and associated documentation files
> (the "Software"), to deal in the Software without restriction,
> including without limitation the rights to use, copy, modify, merge,
> publish, distribute, sublicense, and/or sell copies of the Software,
> and to permit persons to whom the Software is furnished to do so,
> subject to the following conditions:
>
> The above copyright notice and this permission notice shall be
> included in all copies or substantial portions of the Software.
>
> THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
> EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
> MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
> NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS
> BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
> ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
> CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
> SOFTWARE.
