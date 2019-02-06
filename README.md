# `vue-loadable`
[![Build Status](https://travis-ci.org/VitorLuizC/vue-loadable.svg?branch=master)](https://travis-ci.org/VitorLuizC/vue-loadable)
[![License](https://badgen.net/github/license/VitorLuizC/vue-loadable)](./LICENSE)
[![Library minified size](https://badgen.net/bundlephobia/min/vue-loadable)](https://bundlephobia.com/result?p=vue-loadable)
[![Library minified + gzipped size](https://badgen.net/bundlephobia/minzip/vue-loadable)](https://bundlephobia.com/result?p=vue-loadable)

## Installation

This library is published in the NPM registry and can be installed using any compatible package manager.

```sh
npm install --save vue-loadable

# Use the command below if you're using Yarn.
yarn add vue-loadable
```

### Installation from CDN

This module has an UMD bundle available through JSDelivr and Unpkg CDNs.

```html
<script src="https://cdn.jsdelivr.net/npm/vue"></script>
<script src="https://cdn.jsdelivr.net/npm/vue-loadable"></script>

<script>
  // module will be available through `VueLoadable` object.
  console.log(VueLoadable);

  Vue.use(VueLoadable);
</script>
```

## Installation on Vue

`vue-loadable` need to be installed to enable loadable methods, `loadable` decorator and `mapLoadableActions` helper.

To install globally, just pass default exported object as argment to `Vue.use`.

```js
import Vue from 'vue';
import Loadable from 'vue-loadable';

Vue.use(Loadable);
```

You can install it locally instead with `LoadableMixin` mixin.

```vue
<script>
import { LoadableMixin } from 'vue-loadable';

export default {
  mixins: [ LoadableMixin ]
};
</script>
```

## Usage

`vue-loadable` can improve your loading state control by providing pretty simple methods and helpers to automate its usage.

```vue
<template>
  <p v-if="$isLoading('initialize')">Initializing...</p>
  <div v-else>
    <user-list :users="users" />
  </div>
</template>

<script>
import { loadable } from 'vue-loadable';

// ...

export default {
  data () {
    return {
      users: []
    };
  },
  methods: {
    fetch: loadable(async function () {
      const response = await fetch(baseURL + '/users');
      this.users = await response.json();
    }, 'initialize')
  },
  mounted () {
    this.initialize();
  }
};
```

## API

- **`loadable`** decorates a function to change loading state during its execution. It set state as loading when function init and unset on throws an error, on resolve or return a value.

  ```js
  Vue.component('SignInForm', {
    methods: {
      signIn: loadable(async function (name) {
        // ...
      }, 'signIn'),
    },

    async mounted () {
      this.$isLoading('signIn');
      //=> false

      const promise = this.signIn('Vitor');

      this.$isLoading('signIn');
      //=> true

      await promise;

      this.$isLoading('signIn');
      //=> false
    }
  });
  ```

  > It pass down the function arguments, reject the errors and resolve returned value.
  > ```ts
  > async function confirmUsername(username: string): Promise<boolean> {
  >   // ...
  > }
  >
  > export default {
  >   methods: {
  >     // Returns a function with same signature, but handling loading states.
  >     confirm: loadable(confirmUsername, 'confirmation')
  >   },
  >   async mounted (): Promise<void> {
  >     try {
  >       const isConfirmed = await this.confirm('VitorLuizC');
  >       this.$router.push(isConfirmed ? '/checkout' : '/confirmation');
  >     } catch (error) {
  >       new Rollbar.Error(error).send();
  >     }
  >   }
  > };
  > ```

  <details>
    <summary>TypeScript type definitions.</summary>

  <br />

  ```ts
  export default function loadable <Return, Params extends any[]> (
    λ: (this: Vue & LoadableMixin, ...params: Params) => Return | Promise<Return>,
    state?: string,
  ): (this: Vue & LoadableMixin, ...params: Params) => Promise<Return>;
  ```
  </details>

- **`mapLoadableActions`** map Vuex actions into Vue component's methods to trigger loading states.

  > It uses method's names as loading state name.

  ```vue
  <template>
    <div v-if="$isLoading('signInUser')">
      Carregando...
    </div>
    <div v-else>
      <SignedUserArea />
    </div>
  </template>

  <script>
  import { mapLoadableActions } from 'vue-loadable';

  export default {
    methods: mapLoadableActions([
      'signInUser',
      'signUpUser'
    ])
  };
  ```

  > It supports Vuex module namespaces too.
  > ```js
  > Vue.component('SignInForm', {
  >   methods: mapLoadableActions('user', [
  >     'signIn',
  >     'signUp'
  >   ])
  > });
  > ```

  <details>
    <summary>TypeScript type definitions.</summary>

  <br />

  ```ts
  import { mapActions } from 'vuex';

  declare const mapLoadableActions: typeof mapActions;

  export default mapLoadableActions;
  ```
  </details>

- **`$isLoading`** is a method to check if a state is loading.

  ```vue
  <template>
    <v-spinner v-if="$isLoading('initialize')" />
    <sign-in-form v-else @click="onClickSignIn" ... />
  </template>

  <script>
  // ...

  export default {
    methods: {
      ...,
      onClickSignIn () {
        if (!this.$isLoading('signIn')) // Call `signIn` only if its not loading.
          return;

        this.signIn();
      }
    }
  };
  ```

  <details>
    <summary>TypeScript type definitions.</summary>

  <br />

  ```ts
  interface Vue {
    $isLoading(state?: string): boolean;
  }
  ```
  </details>

- **`$isLoadingAny`** is a method to check if any state is loading.

  ```vue
  <template>
    <v-spinner v-if="$isLoadingAny()" />
    <div>
      <sign-in-or-sign-up-form @signIn="onSignIn" @signUp="onSignUp" />
    </div>
  </template>

  <script>
  // ...

  export default {
    methods: {
      ...,
      onSignUp () {
        if (!this.$isLoadingAny())
          return;

        this.signUp();
      },
      onSignIn () {
        if (!this.$isLoadingAny())
          return;

        this.signIn();
      }
    }
  };
  ```

  <details>
    <summary>TypeScript type definitions.</summary>

  <br />

  ```ts
  interface Vue {
    $isLoadingAny(): boolean;
  }
  ```
  </details>

- **`$setLoading`** is a method to set state as loading.

  ```js
  export default {
    methods: {
      ...,
      async onSubmit () {
        this.$setLoading('submission'); // set submission state as loading.

        await services.submit(this.fields);
      }
    }
  };
  ```

  <details>
    <summary>TypeScript type definitions.</summary>

  <br />

  ```ts
  interface Vue {
    $setLoading(state?: string): void;
  }
  ```
  </details>

- **`$unsetLoading`** is a method to unset state as loading.

  ```js
  export default {
    methods: {
      ...,
      async onSubmit () {
        try {
          await services.submit(this.fields);
        } catch {}

        this.$unsetLoading('submission'); // unset submission state as loading.
      }
    }
  };
  ```

  <details>
    <summary>TypeScript type definitions.</summary>

  <br />

  ```ts
  interface Vue {
    $unsetLoading(state?: string): void;
  }
  ```
  </details>

## License

Released under [MIT License](./LICENSE).
