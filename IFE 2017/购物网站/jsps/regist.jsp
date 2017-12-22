<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ page import="java.util.*" errorPage="" %>
<%@ page import="java.sql.*" %>

<% request.setCharacterEncoding("UTF-8");
   try{
     Class.forName("sun.jdbc.odbc.JdbcOdbcDriver");
     String user=request.getParameter("name");
     String password=request.getParameter("password");
     String dbuser="";
     String dbpw="";
     String url="jdbc:odbc:ec";
     Connection conn=DriverManager.getConnection(url,dbuser,dbpw);
     Statement stmt=conn.createStatement(ResultSet.TYPE_SCROLL_SENSITIVE,ResultSet.CONCUR_UPDATABLE);
     String sqladd="insert into users (uname,upassword) values('"+user+"','"+password+"')";
     int i=stmt.executeUpdate(sqladd);
     stmt.close();
     conn.close();
     out.println("注册成功  1");
 }catch(Exception e){
     out.println("用户名重复，请重新设定用户名");
  }
%>

