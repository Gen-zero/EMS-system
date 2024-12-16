// Add this route to the existing users.js file
router.get('/:id/profile', authenticateToken, async (req, res) => {
  try {
    const db = await getDb();
    
    // Get user basic info
    const user = await db.get(`
      SELECT id, username, full_name, email, role, avatar, bio, location
      FROM users 
      WHERE id = ?
    `, [req.params.id]);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Get education
    const education = await db.all(`
      SELECT school, degree, field, start_year, end_year
      FROM user_education
      WHERE user_id = ?
      ORDER BY end_year DESC
    `, [user.id]);

    // Get experience
    const experience = await db.all(`
      SELECT company, position, description, start_date, end_date
      FROM user_experience
      WHERE user_id = ?
      ORDER BY end_date DESC
    `, [user.id]);

    // Get skills
    const skills = await db.all(`
      SELECT skill
      FROM user_skills
      WHERE user_id = ?
    `, [user.id]);

    // Get interests
    const interests = await db.all(`
      SELECT interest
      FROM user_interests
      WHERE user_id = ?
    `, [user.id]);

    // Get certifications
    const certifications = await db.all(`
      SELECT certification
      FROM user_certifications
      WHERE user_id = ?
    `, [user.id]);

    // Get links
    const links = await db.get(`
      SELECT github, linkedin, portfolio
      FROM user_links
      WHERE user_id = ?
    `, [user.id]);

    const profile = {
      ...user,
      education,
      experience,
      skills: skills.map(s => s.skill),
      interests: interests.map(i => i.interest),
      certifications: certifications.map(c => c.certification),
      links: links || { github: '', linkedin: '', portfolio: '' }
    };

    res.json(profile);
  } catch (error) {
    console.error('Get user profile error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});