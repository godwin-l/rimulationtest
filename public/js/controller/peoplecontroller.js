angular.module('vgApp')
.controller('peoplecontroller', [
    '$scope','localStorageService','$state','$location','blogservice',
    function($scope,localStorageService,$state,$location,blogservice) {
      $scope.init=function(){
    $scope.peoples=[{
      "_id":1,
      "name":"vinothraja",
      "img":"https://s3.amazonaws.com/virtualgd/vinoth.jpg",
      "createdOn":"2 Nov 2017",
      "position":"Chairman & co-founder",
      "studied":"Electronics Engineer",
      "info":"Vinoth Raja raised and brought up in Madurai, Tamil Nadu. He has done his schooling from Madurai till higher secondary. He has earned his graduation degree from Velammal Engineering College, Chennai where he developed a passion to build his own startup which leads to the formation of virtualgodown. Since his college days, he has immense interests in artificial intelligence (AI). He joined Cognizant Technology Solutions as a passionate fresher where he got exposed to evolving technologies. In this short period of time, he started wondering to implement his dream into reality and virtualgodown is the outcome of it.He foresees a future where convergence robotics, artificial intelligence (AI), Mixed and virtual reality would make current human abilities meaningless. He has adept knowledge in technology and has also published four patents on powering human imagination to a harmonious reality that would make humans realise their innate capacity i.e convergence of these technology will make way better human abilities. He would love to create the most powerful stature for humans in the upcoming years. His vision is moulded by the strong background in Computer application and AI major fields.",
      "company":"virtualgodown Technologies"
    },
  {
    "_id":2,
    "name":"Rajasekar",
    "img":"https://s3.amazonaws.com/virtualgd/rajasekar.jpg",
    "createdOn":"2 Nov 2017",
    "position":"CEO & co-founder",
    "studied":"Gentic Engineer",
    "info":"Rajasekar is assembling a practical true Virtual Aspects by unifying the necessary aspects of cognitive intelligence i.e. collaborating imagination, learning, and solving problems. After completing Genetic engineering from a reputed college, he started working in Cognizant Technology Solution as a computer engineer where he was awarded an innovation award and prize money of 10 lakh for his innovation tool. Since his schooling, he has a deep passion to learn more about genetics, physics, math, and computers. He was an avid gamer and his favourite game was the Rise of Nation which is primarily a civilisation game, where one can build his own empire out of sheer imagination. And related to this virtualgodown is also something very close to his heart where one can create a very similar system in real world i.e. transforming human imagination to compatible reality by putting very less rimule (virtualgodown's cryptocurrency). After 2 year’s job at CTS, he left his full-time job and joined his father’s chemical business out of sheer passion but leaving job was a challenging task for him. After some time he started earning decent money from his business. In the business, they had to import potassium chloride from China and he found these traditional business methodologies are not only time consuming but also it involves the highly tedious process which can be achieved with a slightest of clicks. As we all know necessity is the mother of invention and here comes the role of virtualgodown. With the aid of Vinoth, his close associate cum friend they led into a startup, virtualgodown. On another note, they came up with a unique business plan and they already knew that this is going to take virtualgodown to the next stage. To everyone virtualgodown (coined term) may appear as “Go Down” but Rajasekar has a unique vision. He thinks virtualgodown as “God's Own” company.",
    "company":"virtualgodown Technologies"
  }]
  }
  $scope.viewmore=function(id,id1,id2){
    document.getElementById(id).style.height = 100 + '%';
    document.getElementById(id).style.overflow = 'visible';
    document.getElementById(id1).style.display = 'none';
    document.getElementsByClassName(id1)[0].style.display = 'block';
  }
  $scope.viewless=function(id,id1,id2){
    document.getElementById(id).style.height = 77 + 'px';
    document.getElementById(id).style.overflow = 'hidden';
    document.getElementById(id1).style.display = 'block';
    document.getElementsByClassName(id1)[0].style.display = 'none';
  }

      }

]);
