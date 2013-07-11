
describe('When loading the default page', function () {
  it('should have a greeting block with Hello World! inside', function () {
    browser().navigateTo('/examples/index.html');
    expect(element('div').count()).toBe(1);
    expect(element('.greeting').html()).toBe('Hello World!');
  });
});
