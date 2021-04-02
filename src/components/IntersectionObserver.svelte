<script>
  import {
    tick,
    createEventDispatcher,
    onDestroy,
    afterUpdate,
    onMount
  } from "svelte";

  export let element = null;
  export let root = null;
  export let rootMargin = "0px";
  export let threshold = 0;

  export let entry = null;
  export let intersecting = false;

  const dispatch = createEventDispatcher();

  let prevElement = null;
  let observer = undefined;

  afterUpdate(async () => {
    if (entry != null) dispatch("observe", entry);
    await tick();
    if (element != null && element != prevElement) {
      observer.observe(element);
      if (prevElement != null) observer.unobserve(prevElement);
      prevElement = element;
    }
  });

  onDestroy(() => {
    if (observer) {
      observer.disconnect();
    }
  });

  onMount(() => {
    observer = new IntersectionObserver(
      entries => {
        entries.forEach(_entry => {
          entry = _entry;
          intersecting = _entry.isIntersecting;
        });
      },
      { root, rootMargin, threshold }
    );
  });
</script>

<slot {intersecting} {entry} />
