<%@ page contentType="text/html;charset=UTF-8" %>
<%@ page session="true" import="java.util.*"   %>
<%@ page import="java.sql.*" %>
<%@ page import="java.io.*" %>

<%
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

  <p>当前购物车的商品为:</p>
  <table>
    <tr>
      <th>商品名</th><th>商品数量</th><th>单价</th>
    </tr>

<%
  //Vector buylist;
  buylist=(Vector<String>)session.getAttribute("shopping");
  if(buylist!=null && buylist.size()>0){
    for(int i=0;i<buylist.size();i=i+2){
      out.print("<tr>");
      out.print("<td>"+buylist.elementAt(i)+"</td>" + "<td>"+buylist.elementAt(i+1)+"</td>");
      out.print("</tr>");
    }
  out.print("</table>");
  }
%>

