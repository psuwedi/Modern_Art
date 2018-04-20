<%=form.text_field :email, :required => true, :pattern => '[^@]+@[^@]+\.[a-zA-Z]{2,6}' %>

<%= link_to "Logout", destroy_user_session_path, method: :delete %> 








<li><%= link_to "Login", new_user_session_path %></li>


























<!-- <div class="sidebar-nav">

<ul class="nav" >

<li style="padding-bottom: 10px; border-bottom: 1px solid grey">
<!-- <ul class="list-inline">
<li class="btn btn-warning " style=" border-radius:0px">    <a href="arts/" > <span class=""> All Arts </span>
</a>
</li>


<li  class="btn btn-info" style=" border-radius:0px">

<a href="arts/" class="btn btn-info" > <span class=""> Exclusive</span>
</a>
</li>
</ul>

</li> -->


<li style="padding-bottom: 10px; border-bottom: 1px solid grey">
<span style="color: black;"> Quick Sort:  </span>  <span style="color: black; float: right"> <a href = "#"> + </a></span>
</li>
<li style="padding-bottom: 10px; border-bottom: 1px solid grey">


<div class="radio disabled">
<label><input type="radio" name="optradio" >Newest</label>
</div>


<div class="radio">
<label><input type="radio" name="optradio">Price (High to Low)</label>
</div>
<div class="radio">
<label><input type="radio" name="optradio">Price (Low to High)</label>
</div>
<div class="radio disabled">
<label><input type="radio" name="optradio" >Most Popular</label>
</div>
</li>


<li style="padding-bottom: 10px; border-bottom: 1px solid grey">
<span style="color: black;"> subjects:  </span>  <span style="color: black; float: right"> <a href = "#"> + </a></span>
</li>
<li style="padding-bottom: 10px; border-bottom: 1px solid grey; display: none">


<div class="radio disabled">
<label><input type="radio" name="optradio" > art style</label>
</div>


<div class="radio">
<label><input type="radio" name="optradio">Fine Art</label>
</div>
<div class="radio">
<label><input type="radio" name="optradio">Decorative Art</label>
</div>
<div class="radio disabled">
<label><input type="radio" name="optradio" >Photography</label>
</div>



</li>

<li style="padding-bottom: 10px; border-bottom: 1px solid grey">
<span style="color: black;">  size:  </span>  <span style="color: black; float: right"> <a href = "#"> + </a></span>
</li>
<li style="padding-bottom: 10px; border-bottom: 1px solid grey">


<div class="radio disabled">
<label><input type="radio" name="optradio" ></label>
</div>


<div class="radio">
<label><input type="radio" name="optradio">Small</label>
</div>

<div class="radio disabled">
<label><input type="radio" name="optradio" > Medium</label>
</div>


<div class="radio">
<label><input type="radio" name="optradio">Large</label>
</div>




</li>


<li style="padding-bottom: 10px; border-bottom: 1px solid grey">
<span style="color: black;"> Prints:  </span>  <span style="color: black; float: right"> <a href = "#"> + </a></span>
</li>
<li style="padding-bottom: 10px; border-bottom: 1px solid grey">


<div class="radio disabled">
<label><input type="radio" name="optradio" >   Framed Art</label>
</div>




<div class="radio">
<label><input type="radio" name="optradio">Canvas</label>
</div>
<div class="radio">
<label><input type="radio" name="optradio">Specialty Products</label>
</div>




</li>
<li>

</li>

</ul>
</div>
