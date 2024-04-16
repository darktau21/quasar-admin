export default defineEventHandler(async (event) => {
  console.log(event);
  

  return {hello: 'world'}
});