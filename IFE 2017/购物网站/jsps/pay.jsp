<%@ page contentType="text/html;charset=UTF-8" %>
<%@ page session="true" import="java.util.*"   %>
<%@ page import="java.sql.*" %>
<%@ page import="java.io.*" %>

<html>
<head>
  <title>结算页面</title>
  <meta name="viewport" content="width=device-width,initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
  <link href="../bootstrap/dist/css/bootstrap.min.css" rel="stylesheet">
  <style>
    body{
      background-image:url(../img/background.jpg);
      background-repeat: no-repeat;
      background-size: cover
    } 
    .white{
      color: white;
    }
    body{
      padding-top: 70px;
    }
  </style>
</head>

<body>
<nav class="navbar navbar-default navbar-fixed-top">
    <div class="container-fluid" id="head">
      <div class="navbar-header navbar-left">
        <a class="navbar-brand" href="#">moyui的3C小屋</a>
      </div>
      <div class="navbar-header navbar-right">
        <p class="navbar-text" id="navbarp">
<%
  String username=(String)session.getAttribute("username");
  out.print("欢迎 " + username);
%>
        </p>
        <button type="button" class="btn btn-default navbar-btn" data-toggle="modal" data-target="#registModal" onclick="window.open('../index.html','_self')"><span class="glyphicon glyphicon-repeat" aria-hidden="true" ></span>&nbsp;返回</button>
      </div>
    </div>
</nav>
<div class="container-fluid">
  <div class="row">
    <div class="col-lg-6 col-lg-offset-3">
      <h2 class="white">购物清单</h2>
      <table class="table table-hover text-center">

<%
  Vector<String> buylist=(Vector<String>)session.getAttribute("shopping");
  if(buylist!=null && buylist.size()>0){
    for(int i=0;i<buylist.size();i=i+3){
      out.print("<tr>");
      out.print("<td>"+buylist.elementAt(i)+"</td>"+"<td>"+buylist.elementAt(i+1)+"</td>"+"<td>"+buylist.elementAt(i+2)+"</td>");
      out.print("</tr>");
    }
  }
%>
</table>
<%
  String goods="";
  String quantities="";
  double sum=0;
  if(buylist!=null && buylist.size()>0){
    for(int i=0;i<buylist.size();i=i+3){
    double qnum=Double.parseDouble(buylist.elementAt(i+1));
    double pnum=Double.parseDouble(buylist.elementAt(i+2));
    goods+=buylist.elementAt(i)+"|";
    quantities+=buylist.elementAt(i+1)+"|";
    sum+=(qnum*pnum);
    }
  }
  try{
    Class.forName("sun.jdbc.odbc.JdbcOdbcDriver");
    String dbuser="";
    String dbpw="";
    String url="jdbc:odbc:ec";
    Connection conn=DriverManager.getConnection(url,dbuser,dbpw);
    Statement stmt=conn.createStatement(ResultSet.TYPE_SCROLL_SENSITIVE,ResultSet.CONCUR_UPDATABLE);
    if(buylist!=null && buylist.size()>0){
      for(int i=0;i<buylist.size();i=i+3){
      double qnum=Double.parseDouble(buylist.elementAt(i+1));
      double pnum=Double.parseDouble(buylist.elementAt(i+2));
      goods=buylist.elementAt(i);
      quantities=buylist.elementAt(i+1);
      sum+=(qnum*pnum);    
      String sqladd="insert into payment (uname,goods,quantities) values('"+username+"','"+goods+"','"+quantities+"')";
      int y=stmt.executeUpdate(sqladd);
      }
    }
    stmt.close();
    conn.close();

  }catch(Exception e){
    out.print("conn Error");
    out.println(e.getMessage());
  }  

  if(buylist!=null){  //清空购物车
    for(int i=buylist.size()-1;i>=0;i--){
    buylist.removeElementAt(i);
    }
  }

  out.println("<h4 class='white'>总价是"+sum+"元</h4>");
%>
    </div>
  </div>

  <div class="row">
    <h3 class="text-center white">请使用以下方式付款</h3>
    <div class="col-lg-4 col-lg-offset-2">
      <img src="../img/zhifubao.jpg" height="300" width="241" class="col-lg-offset-2">
      <div class="caption">
        <h4 class="text-center white">支付宝</h4>
      </div>
    </div>
    <div class="col-lg-4">
      <img src="../img/weixin.png" height="300" width="241" class="col-lg-offset-2">
      <div class="caption">
        <h4 class="text-center white">微信支付</h4>
      </div>
    </div>
  </div>

</div>

<script src="../jquery/dist/jquery.min.js"></script>
<script src="../bootstrap/dist/js/bootstrap.min.js"></script>
</body>
</html>