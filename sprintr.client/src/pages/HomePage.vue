<template>
  <div class="home flex-grow-1 d-flex flex-column align-items-center justify-content-center">
    <div class="card w-50 card-style">
      <img class="card-img-top" src="holder.js/100x180/" alt="">
      <div class="card-body">
        <img src="../assets/img/nav-logo.png" height="600vh" width="600vw" alt="'no image found'">
        <br />
        <button class="card-title">
          Code Runnr
        </button>
        <p class="card-text">
          This is not a drill
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home'
}
</script>

<style scoped lang="scss">

.card-style{
  background-color:#000d2a ;
  color: #d9d9dd;
  border: 1px;
  border-color: #d9d9dd;
  border-style: solid;

}
.home{
  text-align: center;
  user-select: none;
  > img{
    height: 200px;
    width: 200px;
  }
}

</style>
