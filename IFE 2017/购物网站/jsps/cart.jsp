<%@ page contentType="text/html;charset=UTF-8" %>
<%@ page session="true" import="java.util.*"   %>
<%@ page import="java.sql.*" %>
<%@ page import="java.io.*" %>

<html>
<head>
  <title>购物车</title>
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
  </style>
</head>
<body>

<%
  String username=(String)session.getAttribute("username");
  if(username == null){//防止恶意登录
    out.print("请先登录");
    return;
  }
  Vector<String> buylist;
  request.setCharacterEncoding("GBK");  
  String goods=request.getParameter("goods");
  String action=request.getParameter("actions");
  String quantity=request.getParameter("quantity");
  String price="";

  if(goods!=null) {
    try{
      Class.forName("sun.jdbc.odbc.JdbcOdbcDriver");
      String dbuser="";
      String dbpw="";
      String url="jdbc:odbc:ec";
      Connection conn=DriverManager.getConnection(url,dbuser,dbpw);
      Statement stmt=conn.createStatement();
      String sql="select price from items where itname='"+goods+"'";
      ResultSet rs=stmt.executeQuery(sql);
      rs.next();
      price=rs.getString(1);
      rs.close();
      stmt.close();
      conn.close();

    }catch(Exception e){
      out.print("conn Error");
      out.println(e.getMessage());
    }
  }

  if(action!=null && action.equals("AddCart")){
    buylist=(Vector<String>)session.getAttribute("shopping");
    if(buylist==null){  buylist=new Vector<String>(); }
    buylist.addElement(goods);    
    buylist.addElement(quantity);
    buylist.addElement(price);
    session.setAttribute("shopping",buylist);
  }

  if(action!=null && action.equals("Delete")){
    buylist=(Vector<String>)session.getAttribute("shopping");
    if(buylist!=null){
      for(int i=buylist.size()-1;i>=0;i--){
        buylist.removeElementAt(i);
      }
    session.setAttribute("shopping",buylist);
    }
  }
%>

  <h4 class="text-center white">当前购物车的商品为:</h4>
  <table class="table table-hover" >
    <tr>
      <th>商品名</th><th>商品数量</th><th>单价</th><th>总价</th>
    </tr>

<%
  //Vector buylist;
  double sum=0;
  double quantityn=0;
  double pricen=0;
  buylist=(Vector<String>)session.getAttribute("shopping");
  if(buylist!=null && buylist.size()>0){
    for(int i=0;i<buylist.size();i=i+3){
      quantityn=Double.parseDouble(buylist.elementAt(i+1));
      pricen=Double.parseDouble(buylist.elementAt(i+2));
      pricen=pricen*quantityn;
      sum+=pricen;
      out.print("<tr>");
      out.print("<td>"+buylist.elementAt(i)+"</td>"+"<td>"+buylist.elementAt(i+1)+"</td>"+"<td>"+buylist.elementAt(i+2)+"<td>"+pricen+"</td>");
      out.print("</tr>");
    }
  }
%>



</table>

<%
  out.println("<h4 class='white text-center'>商品总价为¥"+sum+"</h5>");
%>

</body>
<script src="../jquery/dist/jquery.min.js"></script>
<script src="../bootstrap/dist/js/bootstrap.min.js"></script>
</html>