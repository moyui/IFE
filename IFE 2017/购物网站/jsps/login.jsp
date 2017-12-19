<%@ page contentType="text/html;charset=GBK" language="java" %>
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
      response.getWriter().print("Welcome " + user);
     }else {
      response.getWriter().print("Login failed, Please enter password again or Regist first");
     }
     rs.close();
     stmt.close();
     conn.close();
  
 }catch(Exception e){
    out.print("conn Error");
    out.println(e.getMessage());
  }
%>