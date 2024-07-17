module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat',    // 새로운 기능 추가
        'fix',     // 버그 수정
        'docs',    // 문서 변경
        'design',  // UI 디자인 변경
        'refactor',// 코드 리팩토링
        "design",  // UI 디자인 변경
        'rename',  // 파일이나 디렉토리 이름 변경
        'remove',  // 파일이나 디렉토리 삭제
        'config',  // 설정 파일 변경
        'chore',   // 기타 변경사항 (빌드 스크립트 수정 등)
        'style',   // 코드 포맷팅, 세미콜론 누락 등 비즈니스 로직에 영향을 주지 않는 변경
      ]
    ]
  }
};