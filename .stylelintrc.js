/*
 * @Author: Yu lin Liu
 * @Date: 2019-10-12 15:28:26
 * @Description: file content
 */
module.exports = {
  extends: ['stylelint-config-standard-scss', 'stylelint-config-prettier'],
  rules: {
    'declaration-colon-space-after': 'always-single-line',
    'declaration-colon-space-before': 'never',
    'declaration-block-trailing-semicolon': 'always',
    'rule-empty-line-before': [
      'always',
      {
        ignore: ['after-comment', 'first-nested']
      }
    ]
  }
}
