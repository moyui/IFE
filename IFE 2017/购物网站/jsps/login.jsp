<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ page import="java.util.*" errorPage="" %>
<%@ page import="java.sql.*" %>
<%@ page import="java.io.*" %>

<% 
   request.setCharacterEncoding("GBK"); 
   String user=request.getParameter("name");
   String pw=request.getParameter("password");
   try{
     Class.forName("sun.jdbc.odbc.JdbcOdbcDriver");
     String dbuser="";
     String dbpw="";
     String url="jdbc:odbc:ec";
     Connection conn=DriverManager.getConnection(url,dbuser,dbpw);
     Statement stmt=conn.createStatement();
     String sql="select * from users where uname='"+user+"' and upassword='"+pw+"'";
     ResultSet rs=stmt.executeQuery(sql);
     if(rs.next()){
      session.setAttribute("username",rs.getString("uname"));
      response.getWriter().print("欢迎 " + user);
     }else {
      response.getWriter().print("登录失败,请重新输入账号或注册新用户");
     }
     rs.close();
     stmt.close();
     conn.close();
  
 }catch(Exception e){
    out.print("conn Error");
    out.println(e.getMessage());
  }
%>