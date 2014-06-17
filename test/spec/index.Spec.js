define(['chai', 'jquery'], function(chai, $) {
	var should = chai.should();

	describe('test', function() {
		it('works for string', function() {
			var test = 'test string';
			test.should.be.a('string');
		});
	});
});