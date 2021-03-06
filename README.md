# `vue-loadable`

[![Build Status](https://travis-ci.org/VitorLuizC/vue-loadable.svg?branch=master)](https://travis-ci.org/VitorLuizC/vue-loadable)
[![License](https://badgen.net/github/license/VitorLuizC/vue-loadable)](./LICENSE)
[![Library minified size](https://badgen.net/bundlephobia/min/vue-loadable)](https://bundlephobia.com/result?p=vue-loadable)
[![Library minified + gzipped size](https://badgen.net/bundlephobia/minzip/vue-loadable)](https://bundlephobia.com/result?p=vue-loadable)
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2FVitorLuizC%2Fvue-loadable.svg?type=shield)](https://app.fossa.io/projects/git%2Bgithub.com%2FVitorLuizC%2Fvue-loadable?ref=badge_shield)

`vue-loadable` improves your loading state flow by providing methods and helpers to manage it.

```html
<template>
  <p v-if="$isLoading('initialize')">Initializing...</p>
  <div v-else>
    <!-- Loaded content... -->
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import { loadable, mapLoadableMethods } from 'vue-loadable';

export default {
  ...,

  methods: {
    async initialize () {
      // Set initialize state as loading on async function start.
      this.$setLoading('initialize');

      try {
        await this.$store.dispatch('users/fetchUsers');
      } catch (_) {}

      // Unset initialize state as loading on async function end.
      this.$unsetLoading('initialize');
    },

    // `loadable` decorator can automate this process.
    initialize: loadable(async function () {
      await this.$store.dispatch('users/fetchUsers');
    }, 'initialize'),

    // An there's `mapLoadableMethods` to map methods into loadable methods (works with Vuex too).
    ...mapLoadableMethods(
      mapActions('users', {
        initialize: 'fetchUsers'
      })
    )
  },
  mounted () {
    this.initialize();
  }
};
```

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

`vue-loadable` need to be installed to enable loadable methods, `loadable` decorator and `mapLoadableMethods` helper.

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
  mixins: [LoadableMixin],
};
</script>
```

## API

- **`loadable`** decorates a function to change loading state during its execution. It sets the state as loading when function inits and unsets when it throws an error, when it resolves or when it returns a value.

  > Second argument is the loading state name, is `"unknown"` when it's not defined.

  ```js
  Vue.component('SignInForm', {
    methods: {
      signIn: loadable(async function(name) {
        // ...
      }, 'signIn'),
    },

    async mounted() {
      this.$isLoading('signIn');
      //=> false

      const promise = this.signIn('Vitor');

      this.$isLoading('signIn');
      //=> true

      await promise;

      this.$isLoading('signIn');
      //=> false
    },
  });
  ```

  > It passes down the function arguments, rejects the errors and resolves the returned value.
  >
  > ```ts
  > async function confirmUsername(username: string): Promise<boolean> {
  >   // ...
  > }
  >
  > export default {
  >   methods: {
  >     // Returns a function with same signature, but handling loading states.
  >     confirm: loadable(confirmUsername, 'confirmation'),
  >   },
  >   async mounted(): Promise<void> {
  >     try {
  >       const isConfirmed = await this.confirm('VitorLuizC');
  >       this.$router.push(isConfirmed ? '/checkout' : '/confirmation');
  >     } catch (error) {
  >       new Rollbar.Error(error).send();
  >     }
  >   },
  > };
  > ```

  <details>
    <summary>TypeScript type definitions.</summary>

  <br />

  ```ts
  type Method =
    | ((...args: any[]) => any)
    | ((this: Vue, ...args: any[]) => any);

  type LoadableMethod<T extends Method> = (
    this: Vue,
    ...args: Parameters<T>
  ) => ReturnType<T> extends Promise<any>
    ? ReturnType<T>
    : Promise<ReturnType<T>>;

  const loadable: <T extends Method>(
    method: T,
    state?: string,
  ) => LoadableMethod<T>;
  ```

  </details>

- **`mapLoadableMethods`** maps methods into loadable ones that triggers loading states, it works pretty well with Vuex.

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
  import { mapActions } from 'vuex';
  import { mapLoadableMethods } from 'vue-loadable';

  export default {
    methods: mapLoadableMethods(
      mapActions([
        'signInUser',
        'signUpUser'
      ])
    )
  };
  ```

  <details>
    <summary>TypeScript type definitions.</summary>

  <br />

  ```ts
  // `Method` and `LoadableMethod` are defined at `loadable` type definitions.

  type Methods = Record<string, Method>;

  type LoadableMethods<T extends Methods> = {
    [K in keyof T]: LoadableMethod<T[K]>;
  };

  const mapLoadableMethods: <T extends Methods>>(
    methods: T,
  ) => LoadableMethods<T>;
  ```

  </details>

- **`$isLoading`** is a method to check if a state is loading.

  > Argument is the loading state name, is `"unknown"` when it's not defined.

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

  > Argument is the loading state name, is `"unknown"` when it's not defined.

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

  > Argument is the loading state name, is `"unknown"` when it's not defined.

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

[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2FVitorLuizC%2Fvue-loadable.svg?type=large)](https://app.fossa.io/projects/git%2Bgithub.com%2FVitorLuizC%2Fvue-loadable?ref=badge_large)
