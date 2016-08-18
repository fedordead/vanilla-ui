const doc = document;

const qa = (el, context = doc) => [].slice.call(context.querySelectorAll(el));

export default qa;
