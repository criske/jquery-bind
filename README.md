# jquery-bind

Reactive jquery (working idea in progress):

```javascript
$(() => {

    const state = $state({
        count: 1
    });

    $('p').$bind(state).observe(function (obj, prop, value) {
        if (prop === 'color') {
            this.css('color', value).css('border-color', value);
        } else if (prop === 'count') {
            this.text(value);
        } else {
            this.text(obj.count);
        }
    });

    setInterval(() => {
        state.count = state.count + 1;
        if (state.count % 2 == 0) {
            const randomColor = Math.floor(Math.random() * 16777215).toString(16);
            state.color = '#' + randomColor;
        }
    }, 1000);

});
```



