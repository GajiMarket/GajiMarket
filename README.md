# GajiMarket
# 1. 프로젝트 개요
## 1.1 프로젝트 제목
### 가지마켓 (Gaji Market)

## 1.2 프로젝트 로고

<div align="center">
    <img src="/readme_image/Logo.png" alt="Logo">
</div>


## 1.3 프로젝트 정보

### 1.3.1 개발 배경
- 기존 중고 거래 플랫폼은 알고리즘 중심의 추천 방식으로 사용자가 다양한 상품을 탐색하는 데 제한적임
- 근처에 더 저렴한 물건이 있더라도 이를 확인하지 못한 채 물건을 구매할 수 있다는 문제점을 인식함
- 기존 중고거래 시스템의 광고 상품에 묻혀 구매자가 좋은 상품을 놓치는 경험을 개선하고자 함
<div align="center">
    <img src="/readme_image/AsIsToBe.png" alt="AsIsToBe">
</div>


### 1.3.2 개발 목표
- 지도 기반으로 사용자 친화적인 중고거래 플랫폼 개발
- 사용자와 상품을 효과적으로 연결해 거래 효율성 증대
- 별도의 지도 어플리케이션 실행 없이 가지마켓 자체적으로 탑재된 내비게이션 기능을 사용하여 목적지까지 길 안내를 받을 수 있음

### 1.3.3 프로젝트 내용
- 사용자 로그인 및 위치 인증
- 지도 기반 상품 탐색 및 등록 기능 제공
- 실시간 채팅 및 내 정보 관리 기능 추가

<div align="center">
    <img src="/readme_image/FlowChart.png" alt="FlowChart">
</div>


### 1.3.4 활용방안
- 위치 기반 지역 커뮤니티에서 상품거래를 활성화하는 플랫폼으로 활용할 수 있음
- 상품 등록 및 구매 데이터를 활용한 향후 지역별 거래 트렌드를 분석할 수 있음

### 1.3.5 기대효과
- 사용자들이 근거리의 상품을 빠르게 확인하고 구매할 수 있음
- 지도 기반의 직관적 탐색으로 사용자 경험 (UX)을 개선할 수 있음
- 개인 간 거래 활성화를 통한 지역 경제 순환을 촉진할 수 있음

### 1.3.6 확장성
- Version 1.0 (구매): 물건 구매 과정의 간소화
- [Version 2.0](https://youtu.be/) (등록): 물건 등록 과정의 간소화
- [Version 3.0](https://youtu.be/) (구매): 물건 구매 경험의 고도화  


## 1.4 개발 기간 (총 41일)
⏰ 2024년 12월 13일 ~ 2025년 1월 22일

<div align="center">
    <img src="/readme_image/Method.png" alt="Method">
</div>



## 1.5 팀 소개
### 가지가지 (GajiGaji)
### 지금 가지러 가지~

#### 👩‍💻 [임경식](https://github.com/qingzhi88) (팀장)
#### 👩‍💻 [김은지](https://github.com/RebbeenStealer)
#### 👩‍💻 [나지은](https://github.com/najieun6)
#### 👩‍💻 [박성호](https://github.com/112park)
#### 👩‍💻 [심유경](https://github.com/YukyungShim)
#### 👩‍💻 [이안형](https://github.com/hyung9683)


## 1.6 시연 영상 링크

🎞 시연 영상 [보러가기](https://youtu.be/)


# 2. 프로젝트 아키텍처
## 2.1 시스템 구성도

![System Architecture](/readme_image/SystemArchitecture.png)


## 2.2 유스케이스 다이어그램

![Usecase Diagram](/readme_image/UsecaseDiagram.png)


## 2.3 ERD (Entity Relationship Diagram)

![ERD](/readme_image/ERD.png)


# 3. 기능설명
## 3.1 메인 지도 홈
- 메인 지도에서 위치정보시스템 기반 POP (Point of Production) 시스템을 통해 내 주변 상품을 지도에서 보여줌

## 3.2 내비게이션
- 별도의 지도 어플리케이션을 실행할 필요 없이 길 찾기 버튼을 통해 팝업에서 내비게이션 기능을 바로 제공할 수 있음

## 3.3 상품 리스트
- 주변에서 판매하는 상품의 정보를 동별로 리스트를 확인할 수 있음

## 3.4 상품 등록
- 등록할 상품의 이미지를 선택하고, 제목, 가격, 상품 상세설명, 거래 희망 장소 (지도)를 입력하여 판매할 상품의 정보를 입력할 수 있음

## 3.5 채팅
- WebSocket을 통해 상품 판매자와 구매자 간의 채팅을 통해 빠르고 안정적인 채팅 기능을 구현할 수 있음

## 3.6 내 정보
- 프로필 수정을 통해 프로필 사진과 닉네임 등을 수정할 수 있음
- 회원별로 관심목록, 판매내역, 구매내역의 거래 관리와, 동네 설정 및 동네 인증, 키워드 알림 설정, 그리고 고객센터와 이용 및 약관 등을 확인 및 관리할 수 있음



# 4. 기술 스택

<div align = "center">
  ## 🛠️ Tech Stack
  
  ### 👩‍💻 Programming Languages
  ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)
  ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)
  
  ### 🌐 Frontend
  ![React](https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=react&logoColor=black)
  ![Zustand](https://img.shields.io/badge/Zustand-563D7C?style=flat-square&logoColor=white)
  ![React Query](https://img.shields.io/badge/React%20Query-FF4154?style=flat-square&logo=reactquery&logoColor=white)
  
  ### 🛠️ Backend
  ![Node.js](https://img.shields.io/badge/Express.js-339933?style=flat-square&logo=node.js&logoColor=white)
  ![OpenSSL](https://img.shields.io/badge/OpenSSL-721412?style=flat-square&logo=openssl&logoColor=white)
  
  ### 🗄️ Database
  ![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=flat-square&logo=postgresql&logoColor=white)
  
  ### ⚙️ DevOps & Deployment
  ![Google Cloud](https://img.shields.io/badge/Google%20Cloud-4285F4?style=flat-square&logo=googlecloud&logoColor=white)
  
  ### 📦 Package Managers
  ![npm](https://img.shields.io/badge/npm-CB3837?style=flat-square&logo=npm&logoColor=white)
  ![yarn](https://img.shields.io/badge/yarn-2C8EBB?style=flat-square&logo=yarn&logoColor=white)
  
  ### 🤝 Collaboration Tools
  ![GitHub](https://img.shields.io/badge/GitHub-181717?style=flat-square&logo=github&logoColor=white)
  ![Figma](https://img.shields.io/badge/Figma-F24E1E?style=flat-square&logo=figma&logoColor=white)
  ![Google Sheets](https://img.shields.io/badge/Google%20Sheets-34A853?style=flat-square&logo=googlesheets&logoColor=white)
  ![Discord](https://img.shields.io/badge/Discord-5865F2?style=flat-square&logo=discord&logoColor=white)
  ![Notion](https://img.shields.io/badge/Notion-000000?style=flat-square&logo=notion&logoColor=white)
  
  ### 🗺️ Map Tools
  ![QGIS](https://img.shields.io/badge/QGIS-589632?style=flat-square&logo=qgis&logoColor=white)
  ![Mapbox](https://img.shields.io/badge/Mapbox-000000?style=flat-square&logo=mapbox&logoColor=white)
  
  ### 🛠️ Development Tools
  ![Visual Studio Code](https://img.shields.io/badge/VSCode-007ACC?style=flat-square&logo=visualstudiocode&logoColor=white)

</div>



# 5. 화면





# 6. 총평
## 6.1 팀 회고


## 6.2 개인 회고

#### 👩‍💻 [김은지](https://github.com/RebbeenStealer)
#### 👩‍💻 [나지은](https://github.com/najieun6)
#### 👩‍💻 [박성호](https://github.com/112park)
#### 👩‍💻 [심유경](https://github.com/YukyungShim)
#### 👩‍💻 [이안형](https://github.com/hyung9683)
#### 👩‍💻 [임경식](https://github.com/qingzhi88)
